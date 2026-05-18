async function addProduct(){

    let formData = new FormData();

    formData.append("name", name.value);
    formData.append("price", price.value);
    formData.append("category", category.value);
    formData.append("image", image.files[0]);

    await fetch("http://localhost:3000/add-product",{
        method:"POST",
        body:formData
    });

    alert("Added");
}