
import { singletonMaster } from '@/utils/singletonBuilder'
import { config } from 'process'
import { expect, test } from 'vitest'
import { builtinEnvironments, populateGlobal } from 'vitest/environments'


test("test true",async ()=> {
    console.log(await singletonMaster.userService.listUsers)
    console.log(process.env.NODE_ENV === 'test')
    expect(true).toBe(true)
    
}

) 
