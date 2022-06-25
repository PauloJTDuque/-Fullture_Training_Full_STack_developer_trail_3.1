class Atividade{
    constructor(inicio, fim, atividade){
        this.inicio = inicio
        this.fim = fim
        this.atividade = atividade
        this.calculaTempo()
    }

    calculaMinutos = (hora) => {
        let string_separada = hora.split(':') // '06:00' => ['06']['00']
        return parseInt(string_separada[0]) * 60 + parseInt(string_separada[1])
    }
    
    calculaTempo = () => {
        let tempo = this.calculaMinutos(this.fim) - this.calculaMinutos(this.inicio)
        this.minutos = tempo
    }
}