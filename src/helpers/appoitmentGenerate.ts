export const appoitmentGenerate = (start:string, end:string, delay:number): object[] => {
    const starthourMin = start.split(":")
    const endhourMin = end.split(":")
    const turnos: object[] = []
    while ( +starthourMin.join("")+delay <= +endhourMin.join("") ) {
        turnos.push({id:starthourMin.join(":"), hour:starthourMin.join(":")})
        starthourMin[1] = (+starthourMin[1] + delay).toString()
        if (+starthourMin[1] > 59) {
            starthourMin[1] = (+starthourMin[1] - 60).toString();
            starthourMin[0] = (+starthourMin[0] + 1).toString();
        } 
    }  
    return turnos;
}