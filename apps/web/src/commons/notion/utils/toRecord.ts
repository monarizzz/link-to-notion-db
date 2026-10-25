type NotionRecord = {
  id: string;
  url: string;
  properties: {
    title: { title: { plain_text: string }[] };
    workTime: { date?: { start?: string; end?: string } };
    select?: { select?: { color?: string } };
  };
};

// TODO: SDK が properties をユニオン型で返すため unknown でキャストして回避中。適切な型ガードに置き換える
const toRecord = (records: unknown) => {
  const r = records as NotionRecord;
  return {
    id: r.id,
    title: r.properties.title.title[0]?.plain_text,
    start: r.properties.workTime.date?.start,
    end: r.properties.workTime.date?.end,
    url: r.url,
    color: r.properties.select?.select?.color,
  };
};

export default toRecord;
