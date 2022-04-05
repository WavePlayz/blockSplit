// BlockSplit
// उदात्त द्वारा निर्मित
// v1.18.10.00-s-0.1.0

import {
	world, 
	MinecraftBlockTypes
} from "mojang-minecraft"


// Inits
const NAME = "BlockSplit"
const VERSION = "1.18.10.00-s-0.1.0"
const TAG = NAME + ":" + VERSION


const info = (key, text) = console[key]?.(TAG + text);


// globals
const events = world.events
const pistonData = new Map()

let वर्तमान०काल०गण = 0


// helpers
function परीक्षण (func) {
	return function() {
		try {
			func.apply(null, ...arguements)
		} catch (error) {
			let stack = error.stack
			
			info( "log", error )
			info( "log", stack )
			info( "warn", error )
			info( "warn", stack )
		}
	}
}


// main
events
	.tick
	.subscribe( () => वर्तमान०काल०गण++ )

events
	.beforePistonActivate 
	.subscribe( परीक्षण(onBeforePistonActivate) )

function onBeforePistonActivate ( दत्तांशः ) {
	const { isExpanding, piston } = दत्तांशः
	
	const { 
		location: { x, y, z }, 
		attachedBlocks 
	} = piston
	
	const मूल = [ x, y, z ].join(" ")
	
	
	if (isExpanding) {
		let काल = वर्तमान०काल०गण
		let शिला०युक्त = attachedBlocks.length
		
		pistonData.set( मूल, { काल, शिला०युक्त } )
		
		return
	}
	
	let { काल, शिला०युक्त } = pistonData.get( मूल )
	
	if (! (काल && शिला०युक्त) ) return;
	
	let कालशेष = वर्तमान०काल०गण - काल
	
	if (कालशेष <= 4 && शिला०युक्त) दत्तांशः.cancel = true;
	
	pistonData.delete(मूल)
	
}

