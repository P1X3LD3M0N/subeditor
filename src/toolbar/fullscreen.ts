import SubEditor from "../subeditor";


export default function(editor : SubEditor) {
    return {
      fullscreen : {
        command : "fullscreen",
        svg : SubEditor.svgList["fullscreen"],
        tips : "fullscreen",
        onRender : (_editor : SubEditor, el : HTMLElement) => {
          //when next button click, set fullscreen according to value, "1"= to fullscreen, ""=exit fullscreen
          el.setAttribute("data-value","1");//next to fullscreen
          el.addEventListener('click', (e) => {
            _editor.command("fullscreen",[el.getAttribute("data-value")]);
          });
  
          _editor.event.register([{ event : "onFullscreenChange", target : [], callback : () => {
            const isFullscreen = el.getAttribute("data-value");
            if(isFullscreen === "") {
              //exit fullscreen
              el.querySelector("span.se-icon")!.innerHTML = SubEditor.svgList["fullscreen"];
              el.setAttribute("data-value","1");
              el.setAttribute("data-tips", "exit fullscreen");
              el.classList.remove("is-featured");
            } else {
              //to fullscreen
              el.querySelector("span.se-icon")!.innerHTML = SubEditor.svgList["fullscreen_close"];
              el.setAttribute("data-value","");
              el.setAttribute("data-tips", "fullscreen");
              el.classList.add("is-featured");
            }
            if(editor.refToolbar) {
              const tips = editor.refToolbar.querySelector(".tips") as HTMLElement;
              if(tips) {
                tips.style.display = "none";
                tips.style.top = "";
              }
            }
            
          }}]);
          
        }
      }
    }
}