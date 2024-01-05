
let api = "http://localhost:3000/data"
let sliderline = document.querySelector(".slider-line")

let btnAdd = document.querySelector(".btnAdd")
let addModal = document.querySelector(".addModal")
let addForm = document.querySelector(".addForm")
btnAdd.onclick = () =>
{
    addModal.showModal()
}
addForm["img"].onchange = (e) =>
{
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)

    addForm.onsubmit = (event) =>
    {
        event.preventDefault()
        let user = 
        {
            img:reader.result
        }
        postUser(user)
        addForm.reset()
    }
} 
async function postUser(user)
{
    try
    {
        let {data} = await axios.post(api , user)
        getData()
    }
    catch(error)
    {
        console.log(error);
    }
}


let cnt = 0
document.querySelector(".btnNext").addEventListener('click' , () =>
{
    cnt += 200
    if(cnt > (cntimg*200)-200)
    {
        cnt = 0
    }
    sliderline.style.width += (cntimg*200)-200
    sliderline.style.left = -cnt + "px"
})
document.querySelector(".btnBack").addEventListener('click' , () =>
{
    cnt -= 200
    if(cnt < 0)
    {
        cnt = (cntimg*200)-200
    }
    sliderline.style.left = -cnt + "px"
})


async function getData()
{
    try
    {
        let {data}  = await axios.get(api)
        get(data)
    }
    catch(error)
    {
        console.log(error);
    }
}



let cntimg = 0
function get(data)
{
    data.forEach(el =>
        {
            let img = document.createElement("img")
            img.src = el.img

            cntimg++

            sliderline.append(img)
        })
}
getData()