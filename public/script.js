const images = [];

document.querySelector("#upl").addEventListener('change' , async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(typeof file)
    images.push(file);
    display();
    let formData = new FormData();
    formData.append('photo', file);
    const res = await fetch(`/upload`,{
        method: 'POST',
        body: formData
    })
    const data = await res.json();
    console.log(data.message);
})


const display = () =>{
    document.querySelector("#img").innerHTML = "";
    images.forEach(image => {
        if(typeof image == "object"){
            let img = document.createElement('img');
            img.src = URL.createObjectURL(image);
            document.querySelector("#img").appendChild(img);
        }else{
            let img = document.createElement('img');
            img.src = "/picure/" + image;
            document.querySelector("#img").appendChild(img);
        }
    })
}

document.getElementById("mainlabel").addEventListener("click", function () {
    document.getElementById("mainlabel").style.display = "none";
})

document.getElementById("add").addEventListener("click", function () {
    document.getElementById("mainlabel").style.display = "none";
})

document.getElementById("erase").addEventListener("click", function () {
    document.querySelector("#img").innerHTML = "";
})