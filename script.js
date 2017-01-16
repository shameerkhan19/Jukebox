var index=0;
var playList= [];
playList[0]=document.getElementById("Aurora");
playList[1]=document.getElementById("Nice");
playList[2]=document.getElementById("Orbit");
playList[3]=document.getElementById("Lookin");
playList[4]=document.getElementById("Control");

function JukeBox(List) {
  this.List =List;
}
 var box = new JukeBox(playList);

$(document).ready(function () {
    document.getElementById("current").innerHTML="Current Song: "+ box.List[index%box.List.length].id;
    document.getElementById("upNext").innerHTML="Coming up Next: "+ box.List[(index+1)%(box.List.length)].id;
  })

document.getElementById("submit").addEventListener("click",function (event){
    event.preventDefault();
    var track= document.querySelector('.box').value;
    $.ajax({
      url:"https://api.spotify.com/v1/search",
      data:{
        q: track,
        type: "track"
      },
    success: function (response){
      if(isitaCopy(track)==false){
        var song= new Audio(response.tracks.items[0].preview_url)
        song.id=track;
        $("ol").append("<li>"+track+"</li>")
        box.List.push(song);
        box.List[index %(box.List.length)].pause();
        box.List[index %(box.List.length)].currentTime=0;
        index=box.List.length-1;
        console.log(index);
        box.List[index].play();
        document.getElementById("current").innerHTML="Current Song: "+ box.List[index%box.List.length].id;
        document.getElementById("upNext").innerHTML="Coming up Next: "+ box.List[(index+1)%(box.List.length)].id;
      }
      else if(isitaCopy(track)==true){
        for(var i=0; i<box.List.length;i++){
          if(box.List[i].id===track){
            box.List[index %(box.List.length)].pause();
            box.List[index %(box.List.length)].currentTime=0;
            index=i;
            box.List[index %(box.List.length)].play();
            document.getElementById("current").innerHTML="Current Song: "+ box.List[index%box.List.length].id;
            document.getElementById("upNext").innerHTML="Coming up Next: "+ box.List[(index+1)%(box.List.length)].id;
          }
        }
      }//end of else
    }
    })//end of ajax
  })//end of eventListener

  document.querySelector("#Play").addEventListener("click", function(){
    box.List[index %(box.List.length)].play();
    document.getElementById("current").innerHTML="Current Song: "+ box.List[(index)%(box.List.length)].id;
    document.getElementById("upNext").innerHTML="Coming up Next: "+ box.List[(index+1)%(box.List.length)].id;
  })

  document.querySelector("#Pause").addEventListener("click", function(){
    box.List[index %(box.List.length)].pause();
  })

  document.querySelector("#Stop").addEventListener("click", function(){
    box.List[(index)%(box.List.length)].pause();
    box.List[(index)%(box.List.length)].currentTime=0;
  })

  document.querySelector("#Next").addEventListener("click", function(){
    box.List[index %(box.List.length)].pause();
    box.List[index %(box.List.length)].currentTime=0;
    box.List[(index+1)%(box.List.length)].play();
    index= (index+1)%(box.List.length);
    document.getElementById("current").innerHTML="Current Song: "+ box.List[(index)%(box.List.length)].id;
    document.getElementById("upNext").innerHTML="Coming up Next: "+ box.List[(index+1)%(box.List.length)].id;
  })
  var startOver_or_newSong=0;
  document.querySelector("#Previous").addEventListener("click", function(){
    if((startOver_or_newSong)%2 ==0){
    box.List[index %(box.List.length)].pause();
    box.List[index %(box.List.length)].currentTime=0;
    box.List[index].play();
    startOver_or_newSong++;
    document.getElementById("current").innerHTML="Current Song: "+ box.List[(index)%(box.List.length)].id;
    document.getElementById("upNext").innerHTML="Coming up Next: "+ box.List[(index+1)%(box.List.length)].id;
    }
    else if((startOver_or_newSong)%2 !=0){
      box.List[index %(box.List.length)].pause();
      box.List[index %(box.List.length)].currentTime=0;
      index--;
      if(index>-1){
        box.List[index].play();
      }
      else if (index<=-1){
        index=box.List.length-1;
        box.List[index].play();
      }
      startOver_or_newSong++;
      document.getElementById("current").innerHTML="Current Song: "+ box.List[(index)%(box.List.length)].id;
      document.getElementById("upNext").innerHTML="Coming up Next: "+ box.List[(index+1)%(box.List.length)].id;
    }
  })

  document.querySelector("#shuff").addEventListener("click", function(){
    var x= Math.floor((Math.random()*box.List.length));
    box.List[index%(box.List.length)].pause();
    box.List[index%(box.List.length)].currentTime=0;
    index=x;
    box.List[index%(box.List.length)].play();
    document.getElementById("current").innerHTML="Current Song: "+ box.List[(index)%(box.List.length)].id;
    document.getElementById("upNext").innerHTML="Coming up Next: "+ box.List[(index+1)%(box.List.length)].id;
  })

  $(".list").css({
    position:'relative',
    top:'-80px',
    height: '400px'
  });

  $('.group').css({
    position:'relative',
    top:'300px'
  })
  function isitaCopy(string){
    for(var i=0;i<box.List.length;i++){
      if(box.List[i].id===string)
        return true;
    }
    return false;
  }

//This was my first attempt and while works was too complicated and having slight issues with pausing spotify songs.
//**************************************************************************************************************************************************//
// var names =[]
// for(var i=0;i<box.List.length; i++){
//   names[i] = box.List[i].id;
// }
//
//
// $(document).ready(function(){
//     document.getElementById('current').innerHTML="Current Sound: "+ box.List[index%(box.List.length)].id+" , Press Play to play";
//     document.getElementById('upNext').innerHTML="Coming up next: "+ box.List[((index+1)%(box.List.length))].id;
//     document.getElementById('Play').addEventListener("click",function() {
//       var data = document.querySelector('.box').value;
//       for(var i=0; i<box.List.length;i++){
//         if(names[i]===data)
//         box.List[i].play();
//       }
//     })
//     document.getElementById('Pause').addEventListener("click",function(){
//       box.List[index%box.List.length].pause();
//     })
//     document.getElementById("Next").addEventListener("click", function(){
//       console.log(box.List.length);
//       var location = (index+1)%(box.List.length);
//       nextSong(names[location]);
//     })
//   });
//   document.getElementById("Play").addEventListener("click", function(){
//         box.List[index].play();
//         Mutext=false;
//   })
//
//   document.getElementById("shuff").addEventListener("click",shuffle);
//
//   document.getElementById("submit").addEventListener("click",function (event){
//     event.preventDefault();
//     var track= document.querySelector('.box').value;
//     var newSong="";
//     $.ajax({
//       url:"https://api.spotify.com/v1/search",
//       data:{
//         q: track,
//         type: "track"
//       },
//     success: function (response){
//       var song= new Audio(response.tracks.items[0].preview_url)
//       song.id=track;
//       if(isitaCopy(track)==false){
//         names.push(track);
//         box.List.push(song);
//         song.play();
//         for(var i=0;i<box.List.length;i++){
//           if(song.id===box.List[i].id){
//             index=i;
//             console.log(index);
//           }
//         }//end of for
//       }
//       else{
//         for(var i=0;i<box.List.length;i++){
//           if(box.List[i].id===song.id){
//             box.List[i].play();
//           }//end of if
//
//         }//end of loop
//       }//end of else
//     }
//     })//end of ajax
//   })//end of eventListener
//
// function nextSong(next){
//   if(next===box.List[(index+1)%(box.List.length)].id){
//     box.List[index%box.List.length].pause();
//     box.List[index%box.List.length].currentTime=0;
//     index++;
//     console.log(index);
//     document.getElementById('current').innerHTML="Current Sound: "+ box.List[(index)%(box.List.length)].id+" Press Play to play";
//     document.getElementById('upNext').innerHTML="Coming up next: "+ box.List[(index+1)%(box.List.length)].id;
//     box.List[index%box.List.length].play();
//   }
//
// }
//
// function previous(index){
//
// }
// var temp=0;
// var it=0;
// function shuffle(){
//   var x= Math.floor((Math.random()*box.List.length));
//   index=x;
//   it++;
//   document.getElementById('current').innerHTML="Current Sound: "+ box.List[x].id+" Press Play to play";
//   document.getElementById('upNext').innerHTML="Coming up next: "+ box.List[(x+1)%box.List.length].id;
//   if(it>1){
//     box.List[(index-1)%box.List.length].pause();
//     box.List[(index-1)%box.List.length].currentTime=0;
//     box.List[x%box.List.length].play();
//   }
//   temp=x;
//   box.List[x].play();
// }
//*****************************************************************************************************************************************************//
