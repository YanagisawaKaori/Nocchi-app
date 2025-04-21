export const getModel = (type = 'light') => {
  const isProd = import.meta.env.VITE_ENV === 'production'
  if (type === 'full') {
    return isProd ? import.meta.env.VITE_MODEL_FULL : import.meta.env.VITE_MODEL_LIGHT
  } else {
    return import.meta.env.VITE_MODEL_LIGHT
  }
}
