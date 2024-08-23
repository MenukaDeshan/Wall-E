import dynamic from "next/dynamic"
import {  Scroll } from "@react-three/drei"

export default function Hero() {

    return (
    <Scroll html style={{width: '100%'}}>
      <h1 className='title' 
        style={{ color: '#cdcbca',position: 'absolute', top: `35vh`,left: '50%', fontSize: '13em', transform: `translate(-50%,-50%)` }}>
          Wall-E
      </h1>
      
      <div className='row' style={{ position: 'absolute', top: `142vh`}}>
        <h2>Wall-E</h2>
        <p style={{ maxWidth: '400px' }}>
        A robot who is responsible for cleaning a waste-covered Earth meets another robot and falls in love with her. Together, they set out on a journey that will alter the fate of mankind.
        </p>
        <button>Read more</button>
      </div>

      <div className='row' style={{ position: 'absolute', top: `230vh`}}>
        <div className='col' style={{ position: 'absolute', right: `40px`, width: "540px"}}>
          <h2 style={{ maxWidth: "440px" }}>Wall-E</h2>
          <p style={{ maxWidth: '440px' }}>
          The film follows a solitary robot named WALL-E on a future, uninhabitable, deserted Earth in 2805, left to clean up garbage. He is visited by a robot called EVE sent from the starship Axiom, with whom he falls in love and pursues across the galaxy.
          </p>                
          <button>Read more</button>
        </div>
      </div>
      
      <h2 style={{ position: 'absolute', top: '350vh', left: '50%', transform: `translate(-50%,-50%)` }}>
        There&apos;s plenty of space out in space!
      </h2>              
      
      <button style={{ position: 'absolute', top: `590vh`,left: '50%', transform: `translate(-50%,-50%)` }}>
        Read More
      </button>
    </Scroll>
    )
  }