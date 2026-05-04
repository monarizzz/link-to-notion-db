const toRecord = (records) => ({
  id: records.id,
  title: records.properties.title.title[0]?.plain_text,
  start: records.properties.workTime.date?.start,
  end: records.properties.workTime.date?.end,
  url: records.url,
  color: records.properties.select?.select?.color,
});

export default toRecord;
