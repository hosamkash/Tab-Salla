import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface SearchOption {
  id: string
  label: string
  value: string
  icon?: React.ReactNode
  disabled?: boolean
  description?: string
}

export interface CtrDropdownSearchProps {
  data: SearchOption[]
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  value?: string
  onSelect?: (option: SearchOption) => void
  onValueChange?: (value: string) => void
  triggerText?: string
  triggerIcon?: React.ReactNode
  triggerIconColor?: string
  triggerIconSize?: string | number
  triggerVariant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary"
  triggerSize?: "default" | "sm" | "lg" | "icon"
  triggerClassName?: string
  width?: number | string
  maxHeight?: number | string
  searchable?: boolean
  caseSensitive?: boolean
  showCheckIcon?: boolean
  disabled?: boolean
  className?: string
  contentClassName?: string
  matchTriggerWidth?: boolean
  commandInputEndSlot?: React.ReactNode
  onSearchValueChange?: (value: string) => void
  onOpenChange?: (open: boolean) => void
}

export function CtrDropdownSearch({
  data,
  placeholder = "اختر عنصر...",
  searchPlaceholder = "ابحث...",
  emptyMessage = "لا توجد نتائج",
  value,
  onSelect,
  onValueChange,
  triggerText,
  triggerIcon,
  triggerIconColor = "#6b7280",
  triggerIconSize = "16px",
  triggerVariant = "outline",
  triggerSize = "default",
  triggerClassName = "w-full justify-between",
  width = "100%",
  maxHeight = 300,
  searchable = true,
  caseSensitive = false,
  showCheckIcon = true,
  disabled = false,
  className,
  contentClassName = "p-0",
  matchTriggerWidth = false,
  commandInputEndSlot,
  onSearchValueChange,
  onOpenChange,
}: CtrDropdownSearchProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")
  const selectedValue = value ?? ""
  const shouldMatchTriggerWidth =
    matchTriggerWidth || width === "100%" || String(width).trim() === "100%"

  const selectedOption = data.find((option) => option.value === selectedValue)

  const filteredData = React.useMemo(() => {
    if (!searchable || !searchValue.trim()) return data

    const searchTerm = caseSensitive ? searchValue.trim() : searchValue.trim().toLowerCase()
    return data.filter((option) => {
      const label = caseSensitive ? option.label : option.label.toLowerCase()
      const optionValue = caseSensitive ? option.value : option.value.toLowerCase()
      const description = option.description
        ? caseSensitive
          ? option.description
          : option.description.toLowerCase()
        : ""
      return (
        label.includes(searchTerm) ||
        optionValue.includes(searchTerm) ||
        description.includes(searchTerm)
      )
    })
  }, [data, searchValue, searchable, caseSensitive])

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) setSearchValue("")
    onOpenChange?.(nextOpen)
  }

  const handleSelectValue = (nextValue: string) => {
    const option = data.find((item) => item.value === nextValue)
    if (!option || option.disabled) return
    onSelect?.(option)
    onValueChange?.(option.value)
    setOpen(false)
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false)
        setSearchValue("")
        onOpenChange?.(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onOpenChange])

  return (
    <div
      ref={rootRef}
      className="relative"
      style={{ width: typeof width === "number" ? `${width}px` : width }}
    >
      <Button
        variant={triggerVariant}
        size={triggerSize}
        disabled={disabled}
        onClick={() => handleOpenChange(!open)}
        className={cn("w-full min-w-0 justify-between gap-2", triggerClassName, className)}
        role="combobox"
        aria-expanded={open}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {triggerIcon && (
            <span style={{ color: triggerIconColor, fontSize: triggerIconSize }}>{triggerIcon}</span>
          )}
          <span
            className={cn(
              "text-start leading-snug",
              shouldMatchTriggerWidth ? "min-w-0 flex-1 truncate" : "truncate"
            )}
          >
            {selectedOption ? selectedOption.label : triggerText || placeholder}
          </span>
        </div>
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" style={{ color: triggerIconColor }} />
      </Button>

      {open ? (
        <div
          className={cn(
            "absolute left-0 right-0 top-[calc(100%+4px)] z-[9999] overflow-hidden rounded-lg border border-border bg-white text-popover-foreground shadow-md",
            contentClassName
          )}
        >
          {searchable && (
            <div className="flex items-center gap-1 border-b p-2">
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(event) => {
                  setSearchValue(event.target.value)
                  onSearchValueChange?.(event.target.value)
                }}
                className="h-9"
              />
              {commandInputEndSlot ? <div className="shrink-0">{commandInputEndSlot}</div> : null}
            </div>
          )}

          <div
            className="overflow-y-auto p-1"
            style={{ maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }}
          >
            {filteredData.length === 0 ? (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">{emptyMessage}</div>
            ) : (
              filteredData.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  disabled={option.disabled}
                  onClick={() => handleSelectValue(option.value)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-right text-sm hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50",
                    option.value === selectedValue && "bg-accent"
                  )}
                >
                  {showCheckIcon ? (
                    <Check
                      className={cn(
                        "h-4 w-4 shrink-0 text-primary",
                        option.value === selectedValue ? "opacity-100" : "opacity-0"
                      )}
                    />
                  ) : null}
                  {option.icon ? <span>{option.icon}</span> : null}
                  <div className="min-w-0 flex-1">
                    <div className="truncate">{option.label}</div>
                    {option.description ? (
                      <div className="truncate text-xs text-muted-foreground">{option.description}</div>
                    ) : null}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CtrDropdownSearch
