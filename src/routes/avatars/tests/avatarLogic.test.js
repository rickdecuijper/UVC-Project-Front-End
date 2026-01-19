import { describe, it, expect, beforeEach } from 'vitest';

let selectie;
const kies = (item) => {
  if (item.categorie === 'huid') {
    selectie.huidskleur = item.hex_kleur;
  } else if (item.categorie === 'haarstijl') {
    selectie.haarvorm = item.afbeelding;
  } else if (item.categorie === 'haarkleur') {
    selectie.haarkleur = item.hex_kleur;
  } else if (item.categorie === 'kleding') {
    selectie.kleding = item.afbeelding;
  } else if (item.categorie === 'accessoire') {
    selectie.accessoire = item.afbeelding;
  }
};

describe('Avatar selection logic', () => {
  beforeEach(() => {
    // Reset selection before each test
    selectie = {
      huidskleur: "#FFDBAC",
      haarvorm: "kort",
      haarkleur: "#442200",
      kleding: "shirt_basis.png",
      accessoire: ""
    };
  });

  it('should update huidkleur when huid item is chosen', () => {
    kies({ categorie: 'huid', hex_kleur: '#FFFFFF' });
    expect(selectie.huidskleur).toBe('#FFFFFF');
  });

  it('should update haarvorm when haarstijl item is chosen', () => {
    kies({ categorie: 'haarstijl', afbeelding: 'lang.png' });
    expect(selectie.haarvorm).toBe('lang.png');
  });

  it('should update haarkleur when haarkleur item is chosen', () => {
    kies({ categorie: 'haarkleur', hex_kleur: '#000000' });
    expect(selectie.haarkleur).toBe('#000000');
  });

  it('should update kleding when kleding item is chosen', () => {
    kies({ categorie: 'kleding', afbeelding: 'shirt_1.png' });
    expect(selectie.kleding).toBe('shirt_1.png');
  });

  it('should update accessoire when accessoire item is chosen', () => {
    kies({ categorie: 'accessoire', afbeelding: 'hat.png' });
    expect(selectie.accessoire).toBe('hat.png');
  });

  it('should not modify other properties when one category is chosen', () => {
    kies({ categorie: 'huid', hex_kleur: '#123456' });
    expect(selectie.haarvorm).toBe('kort');
    expect(selectie.haarkleur).toBe('#442200');
    expect(selectie.kleding).toBe('shirt_basis.png');
    expect(selectie.accessoire).toBe('');
  });
});
