//comum
//Planilha
//Banco de dados? NÃO

let data = await fetch('https://docs.google.com/spreadsheets/d/1DuFnwfhUPxx1ZMN7pD96y1d66B8ZdPfSpdU5PzK9E5Q/gviz/tq?tqx=out:json').then(res => res.text()).then(text => JSON.parse(text.substr(47).slice(0, -2)));
var optionTema = [];
var f;
var numero = [];
if(typeof data === 'object') {
    let num = -1;
    for(var i = 0; i <= data.table.rows.length -1; i++){
        if(data.table.rows[i].c[0] != null || data.table.rows[i].c[0] != undefined){
            const result = optionTema.flatMap((option) => (option === data.table.rows[i].c[0].v));
            result.forEach(element => {
                if(element){
                    f = true;
                };
            });
            if(!f){
                num++;
                optionTema[num] = data.table.rows[i].c[0].v;
            };
            f = false;
            
        };
    };
    for(var i = 0; i <= optionTema.length -1; i++){
        var opcao = document.createElement('option');
        opcao.text = `${optionTema[i]}`;
        document.getElementById("selecao_tema").add(opcao);
    };
}else{
    throw new Error('Sem conexão com a planilha dos dados');
};
document.getElementById("selecao_tema").addEventListener('change', function(){
    document.getElementById("problema").innerHTML="";
    numero.length = 0;
    let temaSelecionado = this.options[this.selectedIndex].text;
    let num = -1;
    for(var i = 0; i <= data.table.rows.length -1; i++){
        if(data.table.rows[i].c[0].v === temaSelecionado){
            num++;
            numero[num] = i;
        };
    };
    for(var i = 0; i <= numero.length -1; i++){ 
        var opcao = document.createElement('option');
        opcao.text = `${data.table.rows[numero[i]].c[1].v}`;
        opcao.value = `${numero[i]}`;
        document.getElementById("problema").add(opcao);
    };
    dados(numero[0]);
});
document.getElementById("problema").addEventListener('change', function(){
    if(numero[1] != undefined){
        dados(parseInt(this.options[this.selectedIndex].value));
    };
});
function dados(problemaSelecionado){
    document.querySelector("#grupo ul").innerHTML="";
    let projeto = parseInt(data.table.rows[problemaSelecionado].c[2].v);
    let por = document.getElementById("por");
    let pon = document.getElementById("pon");
    let porcentagem = document.querySelector(".porcentagem");
    por.innerHTML = projeto + "<br><span>%</span>";
    pon.style.strokeDashoffset = 440 - (440* projeto) /100;
    porcentagem.style.transform = `rotateZ(${projeto * 3.6}deg)`;

    let artigo = parseInt(data.table.rows[problemaSelecionado].c[3].v);
    por = document.getElementById("por1");
    pon = document.getElementById("pon1");
    porcentagem = document.querySelector(".porcentagem1");
    por.innerHTML = artigo + "<br><span>%</span>";
    pon.style.strokeDashoffset = 440 - (440* artigo) /100;
    porcentagem.style.transform = `rotateZ(${artigo * 3.6}deg)`;

    var integrantes = data.table.rows[problemaSelecionado].c[4].v;
    var re = /\s*-\s*/;
    var grupo = integrantes.split(re);
    let liElemento;
    for(var i = 0; i <= grupo.length -1; i++){
        liElemento = document.createElement('li');
        liElemento.textContent = grupo[i];
        document.querySelector("#grupo ul").appendChild(liElemento);
    };
    grupo.length = 0;

};
