

describe("Primer test", () =>{

    it('Revisar que 1 + 1 sea 2', () => {
        
        expect(1 + 1).toBe(2)
    })

    
    it('Revisar que 1 + 1 no sea 3', () => {
        
        expect(1 + 1).not.toBe(3)
    })

}) 