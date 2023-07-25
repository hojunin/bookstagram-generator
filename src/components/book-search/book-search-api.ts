export const fetchBook = async (bookName: string) => {
  const url = 'http://www.aladin.co.kr/ttb/api/ItemSearch.aspx';
  const params = new URLSearchParams({
    ttbkey: 'ttbdlsghwns9405181700001',
    Query: bookName,
    QueryType: 'Title',
    MaxResults: 10,
    start: 1,
    SearchTarget: 'Book',
    output: 'js',
    Version: '20070901',
  });

  try {
    const response = await fetch(`${url}?${params}`);
    return (
      response.item?.map((book) => {
        return { title: book.title, image: book.cover };
      }) ?? []
    );
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
