document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("Configs")) {
    let Configs = {
      Menu: { Quedas: 5, LineChose:"Line_01", OldLine:""},
      Lines: []
    };
    for (let x = 1; x <= 12; x++){
      let id = x < 10 ? `0${x}` : x;
      Configs.Lines.push({
        NameLine: `Line ${id}`, LineID: `Line_${id}`, a1: 0, p1: 0, p: 0
      })
    }
    localStorage.setItem("Configs", JSON.stringify(Configs))
    window.location.reload();
  }
});
