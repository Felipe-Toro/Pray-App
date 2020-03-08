export function todayPrayers (state) {
    let diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado']
    let d = new Date()
    let day = diasDaSemana[d.getDay()] 
    let array = []
    for (let prayer of state.prayers) {
        if (prayer.day === day) {
            array.push(prayer)
        }
    }
    return array
}
