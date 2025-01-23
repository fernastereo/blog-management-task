export const useTruncate = () => {
  const truncate = (text, length = 40, suffix = '...') => {
    if (!text) return ''

    if (text.length <= length) return text

    return `${text.substring(0, length)}${suffix}`
  }

  return {
    truncate,
  }
}
