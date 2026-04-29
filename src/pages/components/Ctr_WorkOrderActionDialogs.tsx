import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, Camera, ImagePlus, Search, Upload } from "lucide-react";
import {
  baskets,
  employeeOptions,
  movementTimeline,
  verificationItems,
} from "@/data/work-orders-data";
import type { WorkOrder } from "@/models/work-order";
import type { WorkOrderPopupType } from "./Ctr_WorkOrderActions";

interface CtrWorkOrderActionDialogsProps {
  activePopup: WorkOrderPopupType;
  order: WorkOrder;
  onClose: () => void;
}

type UploadedImage = {
  id: string;
  name: string;
  sizeLabel: string;
  previewUrl: string;
  source: "device" | "camera";
};

export function Ctr_WorkOrderActionDialogs({
  activePopup,
  order,
  onClose,
}: CtrWorkOrderActionDialogsProps) {
  const verificationBasketName = "سلة تنفيذ الأعمال المدنية";
  const [selectedChecklist, setSelectedChecklist] = useState<string[]>(["v1"]);
  const [forwardBasket, setForwardBasket] = useState("سلة جودة المرفقات");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const deviceInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const selectedVerificationItems = useMemo(
    () => verificationItems.filter((item) => item.basket === verificationBasketName),
    [verificationBasketName],
  );

  const mandatoryUnchecked = selectedVerificationItems.some(
    (item) => item.mandatory && !selectedChecklist.includes(item.id),
  );

  const forwardBasketOptions = baskets.map((basket) => ({
    id: `forward-${basket.id}`,
    value: basket.name,
    label: basket.name,
  }));

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  };

  const onSelectFiles = (fileList: FileList | null, source: "device" | "camera") => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    const newItems: UploadedImage[] = files.map((file) => ({
      id: `${source}-${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
      name: file.name,
      sizeLabel: formatFileSize(file.size),
      previewUrl: URL.createObjectURL(file),
      source,
    }));
    setUploadedImages((prev) => [...newItems, ...prev]);
  };

  useEffect(() => {
    if (!cameraOpen) return;
    let stream: MediaStream | null = null;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" }, audio: false })
      .then((mediaStream) => {
        stream = mediaStream;
        setCameraStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      })
      .catch(() => {
        setCameraOpen(false);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setCameraStream(null);
    };
  }, [cameraOpen]);

  const captureFromCamera = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.drawImage(video, 0, 0, width, height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);

    setUploadedImages((prev) => [
      {
        id: `camera-capture-${Date.now()}`,
        name: `camera-shot-${new Date().toISOString().replace(/[:.]/g, "-")}.jpg`,
        sizeLabel: "لقطة مباشرة",
        previewUrl: dataUrl,
        source: "camera",
      },
      ...prev,
    ]);
    setCameraOpen(false);
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }
  };

  if (!activePopup) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal card-surface" onClick={(event) => event.stopPropagation()}>
        {activePopup === "verify" ? (
          <>
            <h3 className="dialog-header-title">بنود التحقق - سلة: {verificationBasketName}</h3>
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={selectedChecklist.length === selectedVerificationItems.length}
                onChange={(event) =>
                  setSelectedChecklist(
                    event.target.checked ? selectedVerificationItems.map((item) => item.id) : [],
                  )
                }
              />
              تحديد الكل
            </label>
            <div className="checklist">
              {selectedVerificationItems.map((item) => (
                <label key={item.id} className={item.mandatory ? "checkbox-row mandatory" : "checkbox-row"}>
                  <input
                    type="checkbox"
                    checked={selectedChecklist.includes(item.id)}
                    onChange={(event) =>
                      setSelectedChecklist((prev) =>
                        event.target.checked ? [...prev, item.id] : prev.filter((savedId) => savedId !== item.id),
                      )
                    }
                  />
                  <div>
                    <p>{item.title}</p>
                    <small>{item.description}</small>
                  </div>
                  {item.mandatory ? <span className="star">*</span> : null}
                </label>
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                إلغاء
              </button>
              <button className="btn btn-primary" onClick={onClose}>
                حفظ التحقق
              </button>
            </div>
          </>
        ) : null}

        {activePopup === "forward" ? (
          <>
            <h3 className="dialog-header-title">تأكيد وترحيل - {order.workOrderNumber}</h3>
            {mandatoryUnchecked ? (
              <p className="warning-line">
                <AlertTriangle size={16} /> توجد بنود إلزامية غير مكتملة.
              </p>
            ) : null}
            <div className="forward-dialog-grid">
              <div className="forward-col">
                <label className="field-label">ملاحظات الترحيل</label>
                <textarea
                  className="forward-notes text-xs"
                  rows={10}
                  defaultValue="تم استكمال متطلبات المرحلة الحالية."
                />
              </div>
              <div className="forward-col">
                <label className="field-label">ترحيل إلى سلة</label>
                <div className="forward-basket-list">
                  {forwardBasketOptions.map((basket) => (
                    <label key={basket.id} className={forwardBasket === basket.value ? "forward-basket-item active" : "forward-basket-item"}>
                      <input
                        type="radio"
                        name="forward-basket"
                        checked={forwardBasket === basket.value}
                        onChange={() => setForwardBasket(basket.value)}
                      />
                      <span>{basket.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={onClose}>
                ترحيل الآن
              </button>
            </div>
          </>
        ) : null}

        {activePopup === "timeline" ? (
          <>
            <h3 className="dialog-header-title">سجل التحركات - {order.workOrderNumber}</h3>
            <div className="timeline">
              {movementTimeline.map((item) => (
                <div key={item.id} className="timeline-item">
                  <div className="dot" />
                  <div>
                    <p className="timeline-title">
                      {item.date} - تم الترحيل من {item.fromBasket} إلى {item.toBasket}
                    </p>
                    <small>
                      بواسطة {item.user} - {item.note}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {activePopup === "return" ? (
          <>
            <h3 className="dialog-header-title">إرجاع - {order.workOrderNumber}</h3>
            <label className="field-label">إرجاع إلى سلة</label>
            <div className="forward-basket-list">
              {forwardBasketOptions.map((basket) => (
                <label key={`return-${basket.id}`} className={forwardBasket === basket.value ? "forward-basket-item active" : "forward-basket-item"}>
                  <input
                    type="radio"
                    name="return-basket"
                    checked={forwardBasket === basket.value}
                    onChange={() => setForwardBasket(basket.value)}
                  />
                  <span>{basket.label}</span>
                </label>
              ))}
            </div>
            <label className="field-label">سبب الإرجاع</label>
            <textarea className="forward-notes text-xs" rows={4} defaultValue="يرجى استكمال متطلبات المرحلة الحالية." />
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={onClose}>
                تأكيد الإرجاع
              </button>
            </div>
          </>
        ) : null}

        {activePopup === "details" ? (
          <>
            <h3 className="dialog-header-title">عرض التفاصيل - {order.workOrderNumber}</h3>
            <div className="employees-list">
              <div className="employee-row">
                <strong>رقم الأمر:</strong>
                <span>{order.workOrderNumber}</span>
              </div>
              <div className="employee-row">
                <strong>السلة الحالية:</strong>
                <span>{order.currentBasket}</span>
              </div>
              <div className="employee-row">
                <strong>القسم/النوع:</strong>
                <span>
                  {order.section} - {order.type}
                </span>
              </div>
              <div className="employee-row">
                <strong>المسؤول:</strong>
                <span>{order.ownerName}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={onClose}>
                إغلاق
              </button>
            </div>
          </>
        ) : null}

        {activePopup === "reassign" ? (
          <>
            <h3 className="dialog-header-title">إعادة إسناد - {order.workOrderNumber}</h3>
            <div className="search-wrap">
              <Search size={16} />
              <input placeholder="ابحث عن موظف" />
            </div>
            <div className="employees-list">
              {employeeOptions.map((employee) => (
                <label key={employee.id} className="employee-row">
                  <input type="radio" name="employee" />
                  <span className="avatar">{employee.initials}</span>
                  <div>
                    <p>{employee.name}</p>
                    <small>{employee.role}</small>
                  </div>
                </label>
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={onClose}>
                إسناد
              </button>
            </div>
          </>
        ) : null}

        {activePopup === "complete-request" ? (
          <>
            <h3 className="dialog-header-title">طلب استكمال - {order.workOrderNumber}</h3>
            <label className="field-label">نص طلب الاستكمال</label>
            <textarea
              className="forward-notes text-xs"
              rows={5}
              defaultValue="يرجى استكمال البيانات الناقصة وإعادة رفع المرفقات المطلوبة."
            />
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={onClose}>
                إرسال الطلب
              </button>
            </div>
          </>
        ) : null}

        {activePopup === "complete-response" ? (
          <>
            <h3 className="dialog-header-title">الرد على الاستكمال - {order.workOrderNumber}</h3>
            <label className="field-label">تفاصيل الرد</label>
            <textarea
              className="forward-notes text-xs"
              rows={5}
              defaultValue="تم استكمال المتطلبات وإرفاق جميع المستندات."
            />
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={onClose}>
                حفظ الرد
              </button>
            </div>
          </>
        ) : null}

        {activePopup === "attachments" ? (
          <>
            <h3 className="dialog-header-title">قائمة المرفقات - {order.workOrderNumber}</h3>
            <input
              ref={deviceInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(event) => {
                onSelectFiles(event.target.files, "device");
                event.target.value = "";
              }}
            />
            <canvas ref={canvasRef} className="hidden" />
            <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm transition hover:bg-slate-50"
                onClick={() => deviceInputRef.current?.click()}
              >
                <Upload size={16} />
                <span>رفع صور من الجهاز</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm transition hover:bg-slate-50"
                onClick={() => setCameraOpen(true)}
              >
                <Camera size={16} />
                <span>فتح الكاميرا والتقاط صورة</span>
              </button>
            </div>
            {cameraOpen ? (
              <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-2">
                <video ref={videoRef} autoPlay playsInline muted className="h-52 w-full rounded-lg bg-black object-cover" />
                <div className="mt-2 flex gap-2">
                  <button type="button" className="btn btn-primary" onClick={captureFromCamera}>
                    التقاط الآن
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setCameraOpen(false)}>
                    إغلاق الكاميرا
                  </button>
                </div>
              </div>
            ) : null}
            <div className="employees-list">
              <div className="employee-row">
                <span>مخطط المسار.pdf</span>
                <small>2.3 MB</small>
              </div>
              <div className="employee-row">
                <span>صور الموقع قبل التنفيذ.zip</span>
                <small>8.1 MB</small>
              </div>
              <div className="employee-row">
                <span>اعتماد التصريح.jpg</span>
                <small>1.2 MB</small>
              </div>
            </div>
            {uploadedImages.length > 0 ? (
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {uploadedImages.map((image) => (
                  <div
                    key={image.id}
                    className="rounded-xl border border-slate-200 bg-white p-2 text-right shadow-sm"
                  >
                    <img
                      src={image.previewUrl}
                      alt={image.name}
                      className="h-28 w-full rounded-lg object-cover"
                    />
                    <div className="mt-2">
                      <p className="line-clamp-1 text-xs font-semibold text-slate-800">{image.name}</p>
                      <small className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                        <ImagePlus size={12} />
                        {image.sizeLabel} - {image.source === "camera" ? "من الكاميرا" : "من الجهاز"}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={onClose}>
                إغلاق
              </button>
            </div>
          </>
        ) : null}

        {activePopup === "notes" ? (
          <>
            <h3 className="dialog-header-title">ملاحظات - {order.workOrderNumber}</h3>
            <textarea
              className="forward-notes text-xs"
              rows={6}
              defaultValue="تمت معاينة الموقع ميدانيًا، وهناك حاجة لمراجعة مسار الكابلات قبل الإغلاق النهائي."
            />
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={onClose}>
                حفظ الملاحظة
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
