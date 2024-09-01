var nameIput = document.getElementById('name')
var urlIput = document.getElementById('url')
var addBtn = document.getElementById('addBtn')
var tableBody = document.getElementById('tableBody')

var bookmarks  ;

if (localStorage.getItem("bookmarks")==null) {
    bookmarks = [];

    
}else
{
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    displayBook(bookmarks)
}




var nameRegex = /^[A-Za-z_]{1,}$/
function isNameVaild() { 
    if (nameRegex.text(nameIput.value)) {
        return true;
        
    } else {
        return false;
        
    }
    
}
var urlRegex = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3,}$/;
function isUrlVaild() { 
    if (urlRegex.text(urlIput.value)) {
        return true;
        
    } else {
        return false;
        
    }
    
}

nameIput.onkeyup = function () {
    if(isUrlVaild() && isNameVaild())
        {addBtn.removeAttribute("disabled")

        }else
        {
            addBtn.disabled= "true";
        }
  }

  urlIput.onkeyup = function () {
    if(isUrlVaild() && isNameVaild())
        {addBtn.removeAttribute("disabled")

        }else
        {
            addBtn.disabled= "true";
        }
  }





addBtn.onclick = function () {
    var bookmark = {
        name: nameIput.value,
        url: urlIput.value,
    }
    bookmarks.push(bookmark);
    // console.log(bookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    displayBook(bookmarks);
    clearData();

}



function displayBook(anyArray) {
    var marks = '';
    for (let i = 0; i < anyArray.length; i++) {
       marks+= `<tr>  
       <td>${anyArray[i].name}</td>
       <td><a href="${bookmarks[i].url}"> <button class="btn btn-primary">Visit</button></a></td>
       <td><button onclick="update(${i})" class="btn btn-info">Update</button> </td>
       <td><button onclick="deleteBook(${i})" class="btn btn-danger">Delete</button> </td>
       </tr>`
       
    
    }
    tableBody.innerHTML=marks
}

function deleteBook(index) {
    bookmarks.splice(index,1);  
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBook(bookmarks);
    

    
  }
  function clearData ()
  {
    nameIput.value="";
    urlIput.value="";

  }

  function updateBook(index)
  {
    nameIput.value=bookmarks[index].name;
    urlIput.value=bookmarks[index].url;
    addBtn.innerHTML="update";
    


  }

  function search( term) {
    var wantedBook=[];
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].name.toLowerCase().includes(term)) {
        wantedBook.push(bookmarks[i])
        
      }
        
    }
    displayBook(wantedBook);
  }




  

 