export function useClickOutside(
  elementRef: Ref<HTMLElement | null>,
  callback: () => void
) {
  const handler = (e: MouseEvent) => {
    const el = elementRef.value
    if (el && !el.contains(e.target as Node)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener("click", handler)
  })

  onBeforeUnmount(() => {
    document.removeEventListener("click", handler)
  })
}
