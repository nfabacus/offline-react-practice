const add = (a,b)=>a+b
const generateGreeting = (name='Anonymous')=> `Hello ${name}!`

test('should add two numbers', ()=>{
  const result = add(3,4)
  expect(result).toBe(7)
})

test('should generate greeting with name', ()=>{
  const greeting = generateGreeting("Tony")
  expect(greeting).toBe("Hello Tony!")
})

test('should generate greeting with anonymous if name is not provided', ()=>{
  const greeting = generateGreeting()
  expect(greeting).toBe('Hello Anonymous!')
})