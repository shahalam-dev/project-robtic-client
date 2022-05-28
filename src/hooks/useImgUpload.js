const useImgUpload = () => {
  const url = `https://api.imgbb.com/1/upload?key=9c92144ff5c22a1cedbd03673f107afb`;

  const storeImg = async (img) => {
    console.log(img);
    const formData = new FormData();
    formData.append("image", img);
    const imgUrl = await fetch(url, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    return imgUrl.data.url;
  };

  return storeImg;
};

export default useImgUpload;
