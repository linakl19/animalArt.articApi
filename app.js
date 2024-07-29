//1. Get the user input when click on a li tag
//2. call the api to show the results list using the animal Id
//3. Iterate over the array to display the list with the results
//  -extract img, title and artist 

const animalTags = document.querySelectorAll('a[href="#animal__Results"]');
const animal__Results = document.querySelector("#animal__Results");
const artwork = document.querySelector("#artwork");


//Event Listener - for when an animal option is selected
for(let animal of animalTags){
    animal.addEventListener("click", async (e)=>{
        const animalId = e.target.id;
        createUlElement();
        styleTagSelected(animal);
        document.querySelector(".artwork__Container").style.display = "flex";

        const res = await axios.get(`https://api.artic.edu/api/v1/artworks/search?q=${animalId}&query[term][is_public_domain]=true&fields=id,title,image_id,artist_display,place_of_origin,date_display,artist_title,inscriptions,credit_line,medium_display,artist_id`)

        const totalResults = res.data.data;
        console.log(totalResults);

        for (let i = 0; i <totalResults.length; i++){
            let artwork_id = totalResults[i].id;
            let img_id = totalResults[i].image_id;
            let title = totalResults[i].title;
            let artist = totalResults[i].artist_title;
            let artist_id = totalResults[i].artist_id;
                    
            console.log("artist:",artist_id);
        
            if(img_id){
                createResultList(results__List,artwork_id,img_id,title,artist,artist_id);
            }
                
            } 
    })
}
const createUlElement = () => {
    if(document.querySelector("#results__List")){
        document.querySelector("#results__List").remove();
    }
    const results__List = document.createElement("ul");
    results__List.setAttribute("id", "results__List");
    animal__Results.append(results__List);
}

const createResultList = (results__List, artwork_id,img_id, title, artist, artist_id) => {
    let result__List_li = document.createElement("li");
    let result__List_a = document.createElement("a");
    let result__List_Img = document.createElement("img");
    let result__List_Text = document.createElement("div");
    let result__List_Title = document.createElement("p");
    let result__List_Artist = document.createElement("p");

    result__List_li.setAttribute("id", artwork_id);
    result__List_li.setAttribute("class", "result__List_li")
    result__List_a.setAttribute("class", "result__List-Item");
    result__List_a.setAttribute("href", "#article");



    result__List_Img.setAttribute("src", `https://www.artic.edu/iiif/2/${img_id}/full/200,/0/default.jpg`);
    result__List_Img.setAttribute("alt", title);

    result__List_Text.setAttribute("class", "result__List-Text");
    result__List_Title.innerText = title;
    result__List_Artist.innerText = artist;

    result__List_Text.append(result__List_Title, result__List_Artist);
    result__List_a.append(result__List_Img, result__List_Text);
    result__List_li.append(result__List_a);
    results__List.append(result__List_li);

    
    result__List_li.addEventListener("click", () => {
        artwork.style.display = "block";
        displayArtworkContent(artwork_id, img_id);
        displayArtistContent(artist_id);
        
    })
}

const displayArtworkContent = async (artwork_id, img_id) => {
    const artwork_Title_Div = document.querySelector("#artwork_Title_Div");
    let artwork_Title_h2 = document.querySelector("#artwork_Title-h2");
    let artwork_Title_artist = document.querySelector("#artwork_Title-artist");
    let artwork_Title_creation = document.querySelector("#artwork_Title-creation");


    const artwork_Img = document.querySelector("#artwork_Img");
    const artwork_Details = document.querySelector("#artwork_Details");

    const artwork__Res = await axios.get(`https://api.artic.edu/api/v1/artworks/search?query[term][id]=${artwork_id}&fields=title,artist_display,place_of_origin,date_display,artist_title,inscriptions,credit_line,medium_display`);

    let artwork__Data = artwork__Res.data.data[0];

    // Artwork Title Div
    artwork_Title_h2.innerText = artwork__Data.title;
    artwork_Title_artist.innerText = artwork__Data.artist_title;
    artwork_Title_creation.innerText = `Created in ${artwork__Data.place_of_origin}, ${artwork__Data.date_display}`;
    
    artwork_Title_Div.append(artwork_Title_h2, artwork_Title_artist, artwork_Title_creation);

    //Artwork Img
    artwork_Img.setAttribute("src", `https://www.artic.edu/iiif/2/${img_id}/full/843,/0/default.jpg`);
    artwork_Img.setAttribute("alt", artwork__Data.title);

    // Artwork Table
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


const displayArtistContent = async (artist_id)=>{
    const artist__Res = await axios.get(`https://api.artic.edu/api/v1/agents/${artist_id}`);

    let artist__Data = artist__Res.data.data;

    const artist_Info_Name = document.querySelector("#artist_Info_Name");
    const artist_Info_Birth = document.querySelector("#artist_Info_Birth");
    const artist_Info_Death = document.querySelector("#artist_Info_Death");
    const artist_Info_Description = document.querySelector("#artist_Info_Description");

    artist_Info_Name.innerText = artist__Data.title;

    if (!artist__Data.birth_date){
        artist_Info_Birth.innerText = "Not available."
    } else{
        artist_Info_Birth.innerText = artist__Data.birth_date;

    }

    if (!artist__Data.death_date){
        artist_Info_Death.innerText = "Not available."
    } else{
        artist_Info_Death.innerText = artist__Data.death_date;
    }

    if(!artist__Data.description){
        artist_Info_Description.innerText = "Not available."
    } else{
        artist_Info_Description.innerHTML = artist__Data.description;
    }
    
}

// Function to style the clicked anchor tag 
const styleTagSelected = (animalTag) => {
    // Check if the class that styles the clicked anchor tag exists. If it exists, it will be removed.
    // If not, it will be added.
    document.querySelector(".animal-selected")?.classList.remove("animal-selected");
    animalTag.classList.add("animal-selected");

}

const displayArticle=()=>{
    const articleDisplay = article.style.display;
    console.log(articleDisplay);
    // if(article.style.display == "none"){
    //     article.style.display == "block";
    // } else{
    //     article.style.display == "none";
    // }
}

