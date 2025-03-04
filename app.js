document.addEventListener("DOMContentLoaded", () => {
    LinesMenu();
    CriacaoTwoTables();
});

function LinesMenu() {
    let Configs = JSON.parse(localStorage.getItem('Configs'));
    let divLines = document.getElementById("LinesTags");
    divLines.innerHTML = '';
    Configs.Lines.forEach(Line => {
        divLines.innerHTML += `
            <span id=${Line.LineID} onclick=LineClick(this.id) ${Configs.Menu.LineChose == Line.LineID ? "class=LineActive" : ''}>${Line.NameLine}</span>
        `;
    });
}

function LineClick(line) {
    let Configs = JSON.parse(localStorage.getItem('Configs'));
    Configs.Menu.OldLine = Configs.Menu.LineChose;
    Configs.Menu.LineChose = line;
    console.log(`${line} acionada!`)
    localStorage.setItem('Configs', JSON.stringify(Configs));
    LinesMenu();
}

function CriacaoTwoTables() {
    let Configs = JSON.parse(localStorage.getItem('Configs'));
    let mainDiv = document.getElementById('TwoTables');

    let PartidasPontos = "";
    let PartidasAbates = "";
    for (let x = 1; x <= Configs.Menu.Quedas; x++){
        PartidasPontos += `<tr>
            <td>#${x}</td>
            <td><input type=number id=q${x}></td>
            <td><input type=number id=a${x}></td>
            <td></td>
        </tr>`;
        PartidasAbates += `
            <tr>
                <td>#${x}</td>
                <td><input type=number></td>
                <td><input type=number></td>
                <td><input type=number></td>
                <td><input type=number></td>
            </tr>
        `;
    }
    
    mainDiv.innerHTML += `
        <table id=table1 class=TableChose>
            <tr>
                <td>Line</td>
                <td colspan=3><input type=text oninput=RenameLine(this.value)></td>
                <td rowspan=${Configs.Menu.Quedas + 3} class=btnPlayer onclick="SwitchTbl(2)">Players</td>
            </tr>
            <tr>
                <td>Quedas</td>
                <td>Posição</td>
                <td>Abates</td>
                <td>Pontos</td>
            </tr>
            ${PartidasPontos}
            <tr>
                <td colspan=3>Pontuação</td>
                <td>0</td>
            </tr>
        </table>

        <table id=table2 class=TableNoChose>
            <tr>
                <td colspan=5>Abates Individuais</td>
                <td rowspan=${Configs.Menu.Quedas + 2} class=btnPlayer onclick="SwitchTbl(1)">Quedas</td>
            </tr>
            <tr>
                <td>Partidas</td>
                <td><input type=text placeholder=Jogador1></td>
                <td><input type=text placeholder=Jogador2></td>
                <td><input type=text placeholder=Jogador3></td>
                <td><input type=text placeholder=Jogador4></td>
            </tr>
            ${PartidasAbates}
        </table>                                            
    `;
    
}

function SwitchTbl(key) {
    if (key == 2) {
        document.getElementById('table1').classList = 'TableNoChose';
        document.getElementById('table2').classList = 'TableChose';
    }
    else {
        document.getElementById('table2').classList = 'TableNoChose';    
        document.getElementById('table1').classList = 'TableChose';
    }
}