export const currentYear = new Date().getFullYear();

export function dataToOption(data: any) {
    if (data) {
      const { id: value, name: label } = data;
      return { value, label };
    }
    return null;
  }
