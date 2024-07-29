const animalTags = document.querySelectorAll('a[href="#animal__Results"]');
const animal__Results = document.querySelector("#animal__Results");
const artwork = document.querySelector("#artwork");


//Event Listener - for when an animal option is selected
for(let animal of animalTags){
    animal.addEventListener("click", async(e)=>{
        const animalId = e.target.id;
        createUlElement();
        styleTagSelected(e.target);
        document.querySelector(".artwork__Container").style.display = "flex";
        

        try {
            // Make an API call to the Art Institute of Chicago's public domain artworks, searching by animalId or selected animal.
            //In this call, I use the Artwork API Model
            const res = await axios.get(`https://api.artic.edu/api/v1/artworks/search?q=${animalId}&query[term][is_public_domain]=true&fields=id,title,image_id,artist_display,place_of_origin,date_display,artist_title,inscriptions,credit_line,medium_display,artist_id`)
            const totalResults = res.data.data;
    
            for (let i = 0; i <totalResults.length; i++){
                let artwork_id = totalResults[i].id;
                let img_id = totalResults[i].image_id;
                let title = totalResults[i].title;
                let artist = totalResults[i].artist_title;
                let artist_id = totalResults[i].artist_id;
                        
                if(img_id){
                    createResultList(results__List,artwork_id,img_id,title,artist,artist_id);
                }
            } 
        }catch (error) {
            // Log any errors that occur during the API call or data processing
            console.error("Error fetching artworks:", error);
        }
    });
}

// Create the Unorganized result List element. First check if the ul element exists, if it exists, remove it. 
const createUlElement = () => {
    if(document.querySelector("#results__List")){
        document.querySelector("#results__List").remove();
    }
    const results__List = document.createElement("ul");
    results__List.setAttribute("id", "results__List");
    animal__Results.append(results__List);
}

//Create a result List item containing the next element tags: a, img, div, p 
const createResultList = (results__List, artwork_id,img_id, title, artist, artist_id) => {
    let result__List_li = document.createElement("li");
    let result__List_a = document.createElement("a");
    let result__List_Img = document.createElement("img");
    let result__List_Text = document.createElement("div");
    let result__List_Title = document.createElement("p");
    let result__List_Artist = document.createElement("p");

    // Set attributes for the list item
    result__List_li.setAttribute("id", artwork_id);
    result__List_li.setAttribute("class", "result__List_li")
    result__List_a.setAttribute("class", "result__List-Item");
    result__List_a.setAttribute("href", "#article");

    // Set attributes for the image following the API documentation instructions
    result__List_Img.setAttribute("src", `https://www.artic.edu/iiif/2/${img_id}/full/200,/0/default.jpg`);
    result__List_Img.setAttribute("alt", title);

    // Set attributes and content for the text container
    result__List_Text.setAttribute("class", "result__List-Text");
    result__List_Title.innerText = title;
    result__List_Artist.innerText = artist;

    //Append the elements created to its element father
    result__List_Text.append(result__List_Title, result__List_Artist);
    result__List_a.append(result__List_Img, result__List_Text);
    result__List_li.append(result__List_a);
    results__List.append(result__List_li);

    // Add a click event listener to the list item to display the artwork information 
    result__List_li.addEventListener("click", () => {
        artwork.style.display = "block";
        displayArtworkContent(artwork_id, img_id);
        displayArtistContent(artist_id);
    })
}

const displayArtworkContent = async (artwork_id, img_id) => {
    try{
        // Make an API call to the Art Institute of Chicago's public domain artworks, searching by artwork Id.
        //In this call, I use the Artwork API Model
        const artwork__Res = await axios.get(`https://api.artic.edu/api/v1/artworks/search?query[term][id]=${artwork_id}&fields=title,artist_display,place_of_origin,date_display,artist_title,inscriptions,credit_line,medium_display`);
        let artwork__Data = artwork__Res.data.data[0];
        displayArtworkInfo(artwork__Data, img_id)
    }catch(error){
        // Log any errors that occur during the API call or data processing
        console.error("Error fetching artworks:", error);
    }
}

const displayArtistContent = async (artist_id)=>{
    try {
        // Make an API call to the Art Institute of Chicago's public domain artworks, searching by artist Id.
        //In this second call, I use the Agents API Model
        const artist__Res = await axios.get(`https://api.artic.edu/api/v1/agents/${artist_id}`);
        let artist__Data = artist__Res.data.data;
        updateArtistInfo(artist__Data);

    } catch (error) {
        // Log any errors that occur during the API call or data processing
        console.error("Error fetching artworks:", error);
    }
    

    
}

//DISPLAY ARTWORK INFORMATION FUNCTIONS START
const displayArtworkInfo = (artwork__Data, img_id) =>{
    updateArtworkTitleDiv(artwork__Data);
    updateArtworkImg(img_id, artwork__Data);
    updateArtworkInfoTable(artwork__Data);
}
const updateArtworkTitleDiv = (artwork__Data) => {
    const artwork_Title_Div = document.querySelector("#artwork_Title_Div");
    let artwork_Title_h2 = document.querySelector("#artwork_Title-h2");
    let artwork_Title_artist = document.querySelector("#artwork_Title-artist");
    let artwork_Title_creation = document.querySelector("#artwork_Title-creation");

    artwork_Title_h2.innerText = artwork__Data.title;
    artwork_Title_artist.innerText = artwork__Data.artist_title;
    artwork_Title_creation.innerText = `Created in ${artwork__Data.place_of_origin}, ${artwork__Data.date_display}`;
    artwork_Title_Div.append(artwork_Title_h2, artwork_Title_artist, artwork_Title_creation);
}

const updateArtworkImg = (img_id, artwork__Data) =>{
    const artwork_Img = document.querySelector("#artwork_Img");
    artwork_Img.setAttribute("src", `https://www.artic.edu/iiif/2/${img_id}/full/843,/0/default.jpg`);
    artwork_Img.setAttribute("alt", artwork__Data.title);
}

const updateArtworkInfoTable =(artwork__Data)=>{
    const artwork_Info_Title = document.querySelector("#artwork_Info_Title");
    const artwork_Info_Date = document.querySelector("#artwork_Info_Date");
    const artwork_Info_Place = document.querySelector("#artwork_Info_Place");
    const artwork_Info_Medium = document.querySelector("#artwork_Info_Medium");
    const artwork_Info_Inscriptions = document.querySelector("#artwork_Info_Inscriptions");
    const artwork_Info_CreditLine = document.querySelector("#artwork_Info_CreditLine");

    artwork_Info_Title.innerText = artwork__Data.title;
    artwork_Info_Date.innerText = artwork__Data.date_display;
    artwork_Info_Place.innerText = artwork__Data.place_of_origin;
    artwork_Info_Medium.innerText = artwork__Data.medium_display;
    artwork_Info_Inscriptions.innerText = artwork__Data.inscriptions;
    artwork_Info_CreditLine.innerText = artwork__Data.credit_line;
}
//DISPLAY ARTWORK INFORMATION FUNCTIONS END

//DISPLAY ARTIST INFORMATION FUNCTION START
const updateArtistInfo = (artist__Data)=> {
    const artist_Info_Name = document.querySelector("#artist_Info_Name");
    const artist_Info_Birth = document.querySelector("#artist_Info_Birth");
    const artist_Info_Death = document.querySelector("#artist_Info_Death");
    const artist_Info_Description = document.querySelector("#artist_Info_Description");

    artist_Info_Name.innerText = artist__Data.title;

    // Check the artist's birth date availability
    if (!artist__Data.birth_date){
        artist_Info_Birth.innerText = "Not available."
    } else{
        artist_Info_Birth.innerText = artist__Data.birth_date;
    }

    // Check the artist's death date availability
    if (!artist__Data.death_date){
        artist_Info_Death.innerText = "Not available."
    } else{
        artist_Info_Death.innerText = artist__Data.death_date;
    }

    // Check the artist's description availability
    if(!artist__Data.description){
        artist_Info_Description.innerText = "Not available."
    } else{
        artist_Info_Description.innerHTML = artist__Data.description;
    }
}
//DISPLAY ARTIST INFORMATION FUNCTION END

// Function to style the clicked anchor tag 
const styleTagSelected = (animalTag) => {
    // Check if the class that styles the clicked anchor tag exists. If it exists, it will be removed.
    // If not, it will be added.
    document.querySelector(".animal-selected")?.classList.remove("animal-selected");
    animalTag.classList.add("animal-selected");

}

