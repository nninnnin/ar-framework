type MemexDataType =
  | "title"
  | "singletext"
  | "longtext"
  | "category"
  | "date"
  | "number"
  | "boolean"
  | "relation";

const formatDataValue = (
  type: MemexDataType,
  value: unknown
) => {
  switch (type) {
    case "title":
      return {
        KO: String(value),
      };
    case "singletext":
      return String(value);
    case "longtext":
      return String(value);
    case "category":
      return value;
    case "date":
      return value;
    case "number":
      return Number(value);
    case "boolean":
      return String(value); // 서버에서 스트링으로 보내야 인식
    case "relation":
      return value;
    default:
      return value;
  }
};

export const createUpdateBody = <
  FormattedData extends Record<string, unknown>
>(
  formattedData: FormattedData,
  dataTypes: Record<keyof FormattedData, MemexDataType>
) => {
  const converted = Object.entries(
    formattedData
  ).reduce((acc, [key, value]) => {
    acc[key as keyof FormattedData] = formatDataValue(
      dataTypes[key],
      value
    );

    return acc;
  }, {} as Record<keyof FormattedData, unknown>);

  return converted;
};
