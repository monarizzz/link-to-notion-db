type NotionSchema = {
  properties: {
    select: { select: { options: { name: string }[] } };
  };
};

// TODO: SDK が properties をユニオン型で返すため unknown でキャストして回避中。適切な型ガードに置き換える
const toLabels = (schema: unknown) => {
  const s = schema as NotionSchema;
  return s.properties.select.select.options.map((option) => option.name);
};

export default toLabels;
