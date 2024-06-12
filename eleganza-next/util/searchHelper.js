const searchHelper = (
    dataList,
    keyword
  ) => {
    const searchResults = dataList.filter(data => {
      return data.course_name.includes(keyword);
    });
    return searchResults;
  };
  
  export { searchHelper };