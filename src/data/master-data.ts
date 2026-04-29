export type MasterState = {
  id: string;
  code: string;
  name: string;
  description: string;
  enabled: boolean;
};

export type MasterSection = {
  id: string;
  code: string;
  name: string;
  description: string;
  enabled: boolean;
};

export type MasterSubSection = {
  id: string;
  code: string;
  name: string;
  description: string;
  enabled: boolean;
};

export type MasterWorkOrderType = {
  id: string;
  code: string;
  name: string;
  description: string;
  enabled: boolean;
};

export type MasterOwner = {
  id: string;
  employeeCode: string;
  name: string;
  jobTitle: string;
  department: string;
  mobile: string;
  email: string;
  enabled: boolean;
};

export const masterStates: MasterState[] = [
  { id: "st-1", code: "S-001", name: "جديد", description: "تم إنشاء أمر العمل وجاهز للبدء.", enabled: true },
  { id: "st-2", code: "S-002", name: "قيد التنفيذ", description: "الأمر قيد التنفيذ ضمن السلة الحالية.", enabled: true },
  { id: "st-3", code: "S-003", name: "قيد المراجعة", description: "الأمر تحت المراجعة الفنية أو الإدارية.", enabled: true },
  { id: "st-4", code: "S-004", name: "مكتمل", description: "تم إنهاء جميع إجراءات أمر العمل.", enabled: true },
  { id: "st-5", code: "S-005", name: "متأخر", description: "تم تجاوز زمن SLA المحدد للأمر.", enabled: true },
];

export const masterSections: MasterSection[] = [
  { id: "sec-1", code: "SEC-001", name: "مشاريع", description: "إدارة مشاريع التنفيذ والتوسعة.", enabled: true },
  { id: "sec-2", code: "SEC-002", name: "تشغيل", description: "عمليات التشغيل اليومية ومتابعة الأعطال.", enabled: true },
  { id: "sec-3", code: "SEC-003", name: "جودة", description: "مراجعة الجودة والالتزام الفني.", enabled: true },
  { id: "sec-4", code: "SEC-004", name: "تصاريح", description: "إصدار واعتماد التصاريح اللازمة.", enabled: true },
  { id: "sec-5", code: "SEC-005", name: "سلامة", description: "متابعة اشتراطات الأمن والسلامة.", enabled: true },
  { id: "sec-6", code: "SEC-006", name: "GIS", description: "تحديث البيانات المكانية والخرائط.", enabled: false },
  { id: "sec-7", code: "SEC-007", name: "مساندة فنية", description: "دعم فني للفرق التنفيذية.", enabled: true },
  { id: "sec-8", code: "SEC-008", name: "مستودعات", description: "إدارة المواد والمخزون.", enabled: true },
  { id: "sec-9", code: "SEC-009", name: "مالية", description: "متابعة المستخلصات والمعاملات المالية.", enabled: true },
  { id: "sec-10", code: "SEC-010", name: "خدمات العملاء", description: "التنسيق مع طلبات العملاء.", enabled: false },
];

export const masterSubSections: MasterSubSection[] = [
  { id: "sub-1", code: "SUB-001", name: "تنفيذ مدني", description: "أعمال التنفيذ المدني الميدانية.", enabled: true },
  { id: "sub-2", code: "SUB-002", name: "تنفيذ محطات", description: "تنفيذ أعمال المحطات والخلايا.", enabled: true },
  { id: "sub-3", code: "SUB-003", name: "تنفيذ عدادات", description: "تركيب وفحص العدادات.", enabled: true },
  { id: "sub-4", code: "SUB-004", name: "مراجعة مرفقات", description: "فحص واعتماد المستندات المرفقة.", enabled: true },
  { id: "sub-5", code: "SUB-005", name: "كشفيات ميدانية", description: "المعاينات والكشفيات الفنية.", enabled: true },
  { id: "sub-6", code: "SUB-006", name: "تصاريح أعمال", description: "متابعة طلبات واعتمادات التصاريح.", enabled: true },
  { id: "sub-7", code: "SUB-007", name: "تحديث GIS", description: "تحديث الطبقات المكانية.", enabled: false },
  { id: "sub-8", code: "SUB-008", name: "دعم تشغيلي", description: "مساندة الفرق التشغيلية.", enabled: true },
  { id: "sub-9", code: "SUB-009", name: "مستخلصات", description: "إجراءات المستخلصات المالية.", enabled: false },
  { id: "sub-10", code: "SUB-010", name: "إغلاق أوامر", description: "الإغلاق النهائي لأوامر العمل.", enabled: true },
];

export const masterWorkOrderTypes: MasterWorkOrderType[] = [
  { id: "wt-1", code: "TYPE-001", name: "تمديد كابلات", description: "أوامر تمديد وربط الكابلات الكهربائية.", enabled: true },
  { id: "wt-2", code: "TYPE-002", name: "تركيب عداد", description: "تركيب عدادات جديدة للمشتركين.", enabled: true },
  { id: "wt-3", code: "TYPE-003", name: "فحص عداد ذكي", description: "فحص وتشخيص العدادات الذكية.", enabled: true },
  { id: "wt-4", code: "TYPE-004", name: "تصريح حفر", description: "إصدار ومتابعة تصاريح الحفر.", enabled: true },
  { id: "wt-5", code: "TYPE-005", name: "تجهيز غرفة توزيع", description: "تنفيذ أعمال تجهيز غرف التوزيع.", enabled: true },
  { id: "wt-6", code: "TYPE-006", name: "مراجعة مرفقات", description: "مراجعة مستندات وصور أمر العمل.", enabled: true },
  { id: "wt-7", code: "TYPE-007", name: "اعتماد صور الإنجاز", description: "اعتماد الصور النهائية للأعمال.", enabled: true },
  { id: "wt-8", code: "TYPE-008", name: "استبدال قاطع كهربائي", description: "استبدال القواطع الكهربائية التالفة.", enabled: false },
  { id: "wt-9", code: "TYPE-009", name: "مراجعة مسار كابلات", description: "مراجعة واعتماد مسارات الكابلات.", enabled: true },
  { id: "wt-10", code: "TYPE-010", name: "تدقيق ملف سلامة", description: "تدقيق متطلبات السلامة والجودة.", enabled: false },
];

export const masterOwners: MasterOwner[] = [
  { id: "o1", employeeCode: "EMP-001", name: "أحمد سمير", jobTitle: "مهندس تشغيل", department: "تشغيل", mobile: "0501000001", email: "ahmed.s@tab.com", enabled: true },
  { id: "o2", employeeCode: "EMP-002", name: "محمد ياسر", jobTitle: "مسؤول متابعة", department: "مشاريع", mobile: "0501000002", email: "mohamed.y@tab.com", enabled: true },
  { id: "o3", employeeCode: "EMP-003", name: "سارة أشرف", jobTitle: "مراجع جودة", department: "جودة", mobile: "0501000003", email: "sara.a@tab.com", enabled: true },
  { id: "o4", employeeCode: "EMP-004", name: "خالد هشام", jobTitle: "مشرف مشاريع", department: "مشاريع", mobile: "0501000004", email: "khaled.h@tab.com", enabled: true },
  { id: "o5", employeeCode: "EMP-005", name: "ناصر العتيبي", jobTitle: "فني ميداني", department: "تشغيل", mobile: "0501000005", email: "nasser.a@tab.com", enabled: true },
  { id: "o6", employeeCode: "EMP-006", name: "رامي الصالح", jobTitle: "مهندس محطات", department: "مشاريع", mobile: "0501000006", email: "rami.s@tab.com", enabled: false },
  { id: "o7", employeeCode: "EMP-007", name: "مها الزهراني", jobTitle: "مدقق جودة", department: "جودة", mobile: "0501000007", email: "maha.z@tab.com", enabled: true },
  { id: "o8", employeeCode: "EMP-008", name: "وليد الحربي", jobTitle: "منسق إسناد", department: "تشغيل", mobile: "0501000008", email: "waleed.h@tab.com", enabled: true },
  { id: "o9", employeeCode: "EMP-009", name: "دعاء مصطفى", jobTitle: "مراجع مستندات", department: "جودة", mobile: "0501000009", email: "doaa.m@tab.com", enabled: false },
  { id: "o10", employeeCode: "EMP-010", name: "هاني بدوي", jobTitle: "مشرف عمليات", department: "تشغيل", mobile: "0501000010", email: "hani.b@tab.com", enabled: true },
];
