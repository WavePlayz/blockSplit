// BlockSplit
// WavePlayz
// v1.18.10.00-1.0.0-s

import { world, MinecraftBlockTypes } from "mojang-minecraft"


let currentTick = 0
world.events.tick.subscribe(eventData => currentTick++)


const cache = new Map()

let foo = new Map();

world.events.beforePistonActivate.subscribe(bpaEventData => {
	try {
	
	const { isExpanding, piston } = bpaEventData
	const { x, y, z } = piston.location
	
	bpaEventData.dimension.runCommand( "say " + bpaEventData.piston.attachedBlocks.length )
	
	const key = [ x, y, z ].join(" ")
	
	bpaEventData.piston.attachedBlocks.forEach(bl => {
		let d = [
		MinecraftBlockTypes.chest.id,
		MinecraftBlockTypes.trappedChest.id,
		MinecraftBlockTypes.furnace.id,
		MinecraftBlockTypes.enderChest.id
		]
		
		let b = bpaEventData.dimension.getBlock(bl)
		
		
		
		if ( !d.includes(b.id) ) return;
		
		if (!foo.has(key)) foo.set(key, []);
		
		let { x, y, z } = b.location
		
		foo.get(key).push( { x, y, z } )
		
		try {
		bpaEventData.dimension.runCommand(`clone ${x} ${y} ${z} ${x} ${y} ${z} ${x} ${y} ${z} replace move`)
		bpaEventData.dimension.runCommand(`say ${x} ${y} ${z}`)
		} catch(e) {
console.warn(e)
}
	} )
	
	
	
	if (isExpanding) {
		let tick = currentTick 
		let hasBlocks = piston.attachedBlocks.length
		
		cache.set( key, { tick, hasBlocks } )
		
		return
	}
	
	if (! cache.has(key) ) return;
	
	let { tick, hasBlocks } = cache.get(key)
	let tickDifference = currentTick - tick
	
	if (tickDifference <= 4 && hasBlocks) bpaEventData.cancel = true;
	
	cache.delete(key)
	
	} catch (error) {
		console.log(error)
		console.log(error.stack)
		
		console.warn(error)
		console.warn(error.stack)
	}
})



