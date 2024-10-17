// Sort btn
const sortBtn = async () => {
  document.getElementById('spinner').style.display = 'block';
    try{
        const res = await fetch (`https://openapi.programming-hero.com/api/peddy/pets`);
        const data = await res.json();
        let pets = data.pets;

        pets.sort((a, b) => b.price - a.price);

        setTimeout(() => {
            loadPetsDisplay(pets);
            document.getElementById('spinner').style.display = 'none';
        }, 2000)
        document.getElementById('pets-container').innerHTML="";
    }
    catch(err){
        console.log(err)
    }
}

// load All pats from API
const loadAllPets = async () => {
    try{
        document.getElementById('spinner').style.display='block'
        const res = await fetch (`https://openapi.programming-hero.com/api/peddy/pets`);
        const data = await res.json();
        setTimeout(function () {
            loadPetsDisplay(data.pets);
        }, 2000)
        
    }
    catch(err){
        console.log(err);
    }
}

// {
//     "petId": 1,
//     "breed": "Golden Retriever",
//     "category": "Dog",
//     "date_of_birth": "2023-01-15",
//     "price": 1200,
//     "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//     "gender": "Male",
//     "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//     "vaccinated_status": "Fully",
//     "pet_name": "Sunny"
// }

// load All API data display
const loadPetsDisplay = (pets) => {
    document.getElementById('pets-container').innerHTML="";
    document.getElementById('spinner').style.display='none';
    const petsContainer = document.getElementById('pets-container');

    if(pets.length === 0){
        petsContainer.classList.remove("grid")
        petsContainer.classList.add('pet')
        petsContainer.innerHTML = `
             <div class="min-h-[300px] flex flex-col gap-5 items-center justify-center">
                <img src="./images/error.webp" alt="">
                <h2 class="text-center font-bold text-3xl ">No Information Available</h2>
                <p class="w-4/6 text-center font-bold text-xs">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>        
        `
    }
    else{
        petsContainer.classList.add("grid");
        petsContainer.classList.remove('pet')
    }
    pets.forEach((pet) => {
        const {breed, image, date_of_birth, gender, price, petId, pet_name} = pet;
        const card = document.createElement('div');
        card.classList = "col-span-2 p-1 border rounded-xl card card-compact";
        card.innerHTML = `
                                <figure>
                                  <img class="h-[180px] rounded-lg"
                                    src="${image}"
                                    alt="pets" />
                                </figure>
                                <div class="ml-1">
                                  <h2 class="card-title">${pet_name}</h2>
                                  <div class="flex gap-2 items-center text-center">
                                    <i class="fa-brands fa-microsoft"></i>
                                    <p class="text-gray-500">Breed: ${typeof breed === 'string' ? breed : "Normal Breed"}</p>
                                  </div>
                                  <div class="flex gap-2 items-center text-center">
                                    <i class="fa-regular fa-calendar"></i>
                                    <p class="text-gray-500">Birth: ${typeof date_of_birth === 'string'? date_of_birth : "Not Available"}</p>
                                  </div>
                                  <div class="flex gap-2 items-center text-center">
                                    <i class="fa-solid fa-mercury"></i>
                                    <p class="text-gray-500">Gender: ${typeof gender === 'string' ? gender : "Not Available"}</p>
                                  </div>
                                  <div class="flex gap-2 items-center text-center">
                                    <i class="fa-solid fa-dollar-sign"></i>
                                    <p class="text-gray-500">Price: ${typeof price === 'number' ? price : 'Not Available'} $</p>
                                  </div>
                                  <div class="py-2"><hr class="border"></div>
                                  <div class="flex overflow-hidden justify-between">
                                    <button onclick="showImage(${petId})" class="btn hover:bg-primary hover:text-white rounded-lg px-5 border"><i class="fa-regular fa-thumbs-up"></i></button>
                                    <button onclick="adoptModal()" class="rounded-lg hover:bg-primary hover:text-white p-2 border btn">Adopt</button>
                                    <button onclick="showDetails(${petId})" class="btn hover:bg-primary hover:text-white rounded-lg p-2 border">Details</button>
                                  </div>
                                </div>
        `
        petsContainer.append(card);
    })
    
}



// pets category
const loadPetsCategory = async () => {
   try{
        const res = await fetch (`https://openapi.programming-hero.com/api/peddy/categories`);
        const data = await res.json();
        
            loadDisplayBtn(data.categories);
        
   }
   catch(err){
    console.error(err);
   }
}

// active btn remove
const activeBtnRemove = () => {
    const removeBtn = document.getElementsByClassName('active-btn');
    for(let btn of removeBtn){
        btn.classList.remove('active');
    }
}

// load pets Btn category
const loadBtnCategory = async (id) => {
    document.getElementById('spinner').style.display='block'
    const res = await fetch (`https://openapi.programming-hero.com/api/peddy/category/${id}`);
    const data = await res.json();
    
    setTimeout(function () {
        loadPetsDisplay(data.data);
    }, 2000)
    const activeBtn = document.getElementById(`btn-${id}`)
    activeBtnRemove();

    activeBtn.classList.add('active')

    document.getElementById('pets-container').innerHTML="";
}



// {
//     "id": 1,
//     "category": "Cat",
//     "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
// }

const loadDisplayBtn = (categories) => {
    const patsBtn = document.getElementById('pets-btn');
    categories.forEach((Category) => {
        const {category_icon, category} = Category;

        const div = document.createElement('div');
        div.innerHTML = `
             <button id="btn-${category}" onclick="loadBtnCategory('${category}')" class="flex gap-4  overflow-hidden border border-gray-200 items-center text-center px-12 active-btn">
                        <img src="${category_icon}" alt="">
                        <h3 class="font-bold">${category}</h3>
                    </button>
        `
        patsBtn.appendChild(div);
    })
  
}




// adopt Modal
const adoptModal = () => {
    const adoptContainer = document.getElementById('adopt-container');
    adoptContainer.innerHTML ="";
    const adoptModal = document.createElement('div');
    adoptModal.innerHTML = `
              <dialog id="my_modal_4" class="modal">
  <div class="modal-box mx-auto items-center text-center">
  <img class="mx-auto" src="https://img.icons8.com/?size=80&id=7NHc4WZuftxh&format=png"/>
  <h1 class="text-5xl font-bold">Congrates</h1>
  <p class="py-4 text-sm">Adoption process is Start For your Pet</p>
    <div class="py-2 text-3xl font-bold">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button><span id="timer">3</span></button>
      </form>
    </div>
  </div>
</dialog>
    `
    adoptContainer.append(adoptModal);
    adoptModalClose();
    my_modal_4.showModal();
}


// adopt Modal close
const adoptModalClose = () => {
    let countDown = 3;
    const timerEl = document.getElementById('timer');

   const countDownInterval = setInterval(()=> {
        countDown--;
        timerEl.innerText = countDown;

        if(countDown === 0){
            clearInterval(countDownInterval);
            my_modal_4.close();
        }
    }, 1000)
}




// show image on ride side div
const showImage = async (images) => {
    try{
        const res = await fetch (`https://openapi.programming-hero.com/api/peddy/pet/${images}`);
        const data = await res.json();
        const {image} = data.petData;

        const imageContainer = document.getElementById('image-container');
        const imageDiv = document.createElement('div');
        imageDiv.innerHTML = `
             <img class="w-full rounded-xl" src="${image}" alt="pets" />
        `
        imageContainer.append(imageDiv);
    }
    catch(err){
        console.error(err)
    }
}




// show modal & details

// {
//     "petId": 1,
//     "breed": "Golden Retriever",
//     "category": "Dog",
//     "date_of_birth": "2023-01-15",
//     "price": 1200,
//     "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//     "gender": "Male",
//     "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//     "vaccinated_status": "Fully",
//     "pet_name": "Sunny"
// }

const showDetails = async (details) => {
    try{
        const res = await fetch (`https://openapi.programming-hero.com/api/peddy/pet/${details}`);
        const data = await res.json();
            const {image, vaccinated_status, breed,  date_of_birth, gender, price, pet_details, pet_name} = data.petData;
            const modalContainer = document.getElementById('modal-container');
            modalContainer.innerHTML = "";
            const modalDiv = document.createElement('div');
            modalDiv.innerHTML = `
                <dialog id="my_modal_1" class="modal">
                    <div class="modal-box">
                     <img class="w-full"
                                    src="${image}"
                                    alt="pets" />
                  <div class="ml-1">
                                  <h2 class="card-title text-4xl">${pet_name}</h2>
                    </div>               
                                <div class="md:flex py-2 justify-between ">
                                     <div >
                                     <div class="flex gap-2 items-center text-center">
                                    <i class="fa-brands fa-microsoft"></i>
                                    <p class="text-gray-500">Breed: ${typeof breed === 'string' ? breed : "Normal Breed"}</p>
                                  </div>
                                 
                                  <div class="flex gap-2 items-center text-center">
                                    <i class="fa-solid fa-mercury"></i>
                                    <p class="text-gray-500">Gender: ${typeof gender === 'string' ? gender : "Not Available"}</p>
                                  </div>
                                  <div class="flex gap-2 items-center text-center">
                                    <i class="fa-solid fa-mercury"></i>
                                    <p class="text-gray-500">Vaccinated Status: ${typeof vaccinated_status === 'string' ? vaccinated_status : "Not Available"}</p>
                                  </div>    
                                </div>
                            
                               <div>
                                    <div class="flex gap-2 items-center text-center">
                                    <i class="fa-regular fa-calendar"></i>
                                    <p class="text-gray-500">Birth: ${typeof date_of_birth === 'string'? date_of_birth : "Not Available"}</p>
                                  </div>

                                  <div class="flex gap-2 items-center text-center">
                                    <i class="fa-solid fa-dollar-sign"></i>
                                    <p class="text-gray-500">Price: ${typeof price === 'number' ? price : 'Not Available'}$</p>
                                  </div>
                               </div>  
                            </div>
                        <div class="py-2"><hr class="border"></div>
                        
                        <h3 class="font-bold text-xl">Details Information</h3>
                        <p class="py-2">${pet_details}</p>
                            
                    <div class="mt-2">
                        <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn w-full bg-gray-300  text-primary">Close</button>
                        </form>
                    </div>
                    </div>
                </dialog>
            `
            modalContainer.append(modalDiv);
            my_modal_1.showModal();
        
    }   
    catch(err){
        console.error(err);
    }
}





loadPetsCategory();
loadAllPets();