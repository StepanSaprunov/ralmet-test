function buildFormData(formData: any, data: any, parentKey?: any) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
    if (!(Array.isArray(data))) {
      Object.keys(data).forEach(key => {
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    }
    else {
      data.forEach((el, index) => buildFormData(formData, el, parentKey === 'files' ? parentKey : `${parentKey}[${index}]`));
    }
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}

export function jsonToFormData(data: any) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}