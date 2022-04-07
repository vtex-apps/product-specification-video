import React from 'react'
import { useProduct, ProductContext } from 'vtex.product-context'
import { Video } from 'vtex.store-video'
import { useCssHandles } from 'vtex.css-handles'


interface ProductvideoProps {
  specification?: string
  fallbackvideo?: string
  group?: string
  name?: string
  description?: string,
  type?: string,
  poster?: string,
  controlsType?: string ,
  autoPlay?: boolean,
  muted?: boolean,
  loop?: boolean,
  playsInline?: boolean,
  width?: string,
  height?: string,
  PlayIcon?: string,
  PauseIcon?: string,
  VolumeOnIcon?: string,
  VoluemOffIcon?: string,
  FullscreenIcon?: string,
  blockClass?: string
  format: string,
  overlay: boolean
  

}

const CSS_HANDLES = [
  
  'containerEmpty',
  'videoContainer',
  'overlay',
  'noOverlay',
  'fourByThree',
  'sixteenByNine',
] as const

const Productvideo: StorefrontFunctionComponent<ProductvideoProps> = (
  { specification = "", 
    fallbackvideo = "",
    group = "",
    name = undefined,
    description = undefined,
    type = undefined,
    poster = undefined,
    controlsType = undefined,
    autoPlay = false,
    muted = false,
    loop = false,
    playsInline = false,
    width = undefined,
    height = undefined, 
    PlayIcon = "icon-play",
    PauseIcon = "icon-pause",
    VolumeOnIcon = "icon-volume",
    VoluemOffIcon = "icon-volume-off",
    FullscreenIcon = "icon-extend",
    blockClass= "",
    format="16:9",
    overlay= false
    
  }
  
  ) => {

    const { handles }= useCssHandles(CSS_HANDLES, blockClass)

  const productContextValue = useProduct();
  const {product} = useProduct();

  let video=loadField();

  function joinDOM(){
    if(typeof video[0] == "undefined") return "";
    else return video[0];
  }

  function loadField(){
    var output=[];
    if(specification>="" && group >=""){

      var groups= productContextValue?.product?.specificationGroups || false;
      
      if(typeof groups == "object" && groups.length>0){
        //console.log("groups:");
        //console.log(groups);
        for(var i=0; i<groups.length; i++){
          //finding the field in the groups
          if(groups[i].originalName != group) continue;

          for(var j=0; j<groups[i].specifications.length; j++){
            if(groups[i].specifications[j].originalName != specification) continue; //not ours? skip!

            output=groups[i].specifications[j].values; 
           // console.log("JACKPOT!");
           // console.log(output);
            break;
          }
          break;
          /*if(fields[i].name==specification && fields[i].values.length>0){
            console.log("found field: " + specification)
            
            output=fields[i].values[0];
            console.log("found value: " + output)
            break;
          }*/
        }
      }else { //we couldnt find groups, lets try to load the field individually.
        var fields = productContextValue.product?.properties;
        if(typeof fields == "object" && fields.length>0){
          for(var i=0; i<fields.length; i++){
            if(fields[i].name==specification){
              return fields[i].values
              
            } else continue;
          }
        }

      }
    }
    return output;
  }
  
  /*function activateProductContext(){
    console.log(productContextValue);
    console.log(specification);
    console.log("i got "+loadField());
    console.log("zeh video "+video)
    console.log("Zeh Fallback "+fallbackvideo)
  }*/

  function buildDom(){
    fallbackvideo = (typeof fallbackvideo == "undefined" ? "" : fallbackvideo);
    var zvideo=joinDOM();
    //console.log(zvideo);
    video = (typeof zvideo == "undefined" ? "" : zvideo);
    if(fallbackvideo.trim()<='' && video.trim() <='' ){

      return <div className={handles.containerEmpty} ></div>;
    }
    else{
      var finalvideo =( video.trim()>'' ? video : fallbackvideo);

      let classnames=handles.VideoContainer//[handles.VideoContainer, FM].join(" ");
      console.log(classnames)
      console.log(handles)
      return (
        <div className={classnames}>
          <Video name={name}
            description={description}
            type={type}
            poster={poster}
            controlsType={controlsType}
            autoPlay={autoPlay}
            muted={muted}
            loop = {loop}
            playsInline={playsInline} 
            width= {width}
            height={height} 
            PlayIcon={PlayIcon}
            PausIcon={PauseIcon}
            VolumeOnIcon={VolumeOnIcon}
            VolumeOffIcon={VoluemOffIcon}
            FullscreenIcon={FullscreenIcon}
            
            src={finalvideo}
            />
          <div className={overlay==true ? handles.overlay : handles.noOverlay} />
        </div>
      )
      
    }


  }
  
  
//<h3><button onClick={activateProductContext} >click me</button></h3>
const FM=(format == "4:3" ?  handles.fourByThree : handles.sixteenByNine);
  return ( <div className={FM}>
    {buildDom()}
  </div> )
}


//Stuff for the site editor. Might not need it.
Productvideo.schema = {
  title: 'editor.video.title',
  description: 'editor.video.description',
  type: 'object',
  properties: {

    specification: {
            title: 'Video specification field name',
            description: 'in which field is the video stored?',
            type: 'string',
            default: undefined,
        },
      fallbackvideo: {
          title: 'Fallback video if specification not found.',
          description: 'leave empty to hide player',
          type: 'string',
          default: undefined,
      },

      name: {
        title: 'The Name of the Video.',
        description: 'Add this for SEO purposes',
        type: 'string',
        default: undefined,
    },
    description: {
      title: 'Description.',
      description: 'Video description for SEO and accessibility.',
      type: 'string',
      default: undefined,
  },
  type: {
      title: 'Type',
      description: 'The video Type',
      type: 'string',
      default: undefined,
  },
  poster: {
      title: 'Video Poster',
      description: 'Cover image to be displayed before playback',
      type: 'string',
      default: undefined,
  },
  controlsType: {
      title: 'Type of controls',
      description: 'Type of controls on HTML5 video: vtex, native or none',
      type: 'string',
      default: undefined,
  },
  autoPlay: {
      title: 'Autoplay',
      description: 'Whether the video plays automatically',
      type: 'boolean',
      default: false,
  },
  muted: {
      title: 'Muted',
      description: 'Play the video with no sound',
      type: 'boolean',
      default: false,
  },
  loop: {
      title: 'Loop',
      description: 'Play the video in a loop',
      type: 'boolean',
      default: false,
  },
  playsInline: {
      title: 'Plays inline',
      description: 'Whether the video plays inline or not',
      type: 'boolean',
      default: false,
  },
  width: {
      title: 'Width',
      description: 'The Width of the video in PX or %',
      type: 'string',
      default: undefined,
  },
  height: {
      title: 'height',
      description: 'The height of the video in PX or %',
      type: 'string',
      default: undefined,
  },
  PlayIcon: {
      title: 'Play Icon',
      description: 'Video Playback icon',
      type: 'string',
      default: 'icon-play',
  },
  PauseIcon: {
      title: 'Pause Icon',
      description: 'Video Pause Icon',
      type: 'string',
      default: 'icon-pause',
  },
  VolumeOnIcon: {
      title: 'Volume Icon',
      description: 'The icon to use for the volume-on control',
      type: 'string',
      default: 'icon-volume-on',
  },
  VolumeOffIcon: {
      title: 'Volume Icon',
      description: 'The icon to use for the volume-off control',
      type: 'string',
      default: 'icon-volume-off',
  },
    FullscreenIcon: {
      title: 'Fullscreen Icon',
      description: 'The icon used to switch to full screen',
      type: 'string',
      default: 'icon-extend',
  }

      

  },
}

export default Productvideo
