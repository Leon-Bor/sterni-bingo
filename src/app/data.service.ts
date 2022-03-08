import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Notyf } from 'notyf';
import ConfettiGenerator from 'confetti-js';

const sleep = (ms = 1000) => {
  return new Promise((r) => {
    setTimeout(() => {
      r();
    }, ms);
  });
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  saufLink = localStorage.getItem('saufLink') || null;
  korken = [];
  fields = [];
  archiveFields = [];
  archiveBingoNumbers = [];
  lastUpdate = null;
  name = null;

  hasConversation = false;

  knownFields = {
    field0: [
      ['03', '27', '36', '89', '70'],
      ['54', '90', '60', '11', '48'],
      ['19', '45', '02', '73', '24'],
      ['67', '30', '52', '26', '98'],
      ['71', '13', '84', '05', '33'],
    ],
    field1: [
      ['10', '81', '54', '29', '47'],
      ['64', '04', '76', '13', '92'],
      ['70', '95', '50', '44', '16'],
      ['28', '26', '33', '77', '40'],
      ['11', '53', '89', '56', '02'],
    ],
    field2: [
      ['13', '55', '41', '69', '93'],
      ['09', '32', '74', '26', '87'],
      ['62', '02', '99', '17', '34'],
      ['46', '83', '54', '78', '21'],
      ['58', '15', '66', '37', '70'],
    ],
    field3: [
      ['14', '77', '38', '02', '85'],
      ['61', '23', '96', '49', '54'],
      ['06', '88', '13', '31', '75'],
      ['42', '26', '65', '59', '97'],
      ['70', '08', '51', '12', '20'],
    ],
    field4: [
      ['91', '70', '39', '63', '07'],
      ['25', '46', '82', '18', '54'],
      ['79', '68', '13', '22', '86'],
      ['02', '57', '35', '94', '40'],
      ['43', '01', '72', '26', '80'],
    ],
    field5: [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ],
  };

  startBingo = false;
  bingoNumbers = null;

  notyf = new Notyf({
    duration: 5000,
    types: [
      {
        type: 'warning',
        background: 'orange',
        icon: false,
      },
    ],
  });

  constructor(private http: HttpClient) {
    window.addEventListener('devtoolschange', async (event) => {
      if (this.hasConversation === false && (event as any)?.detail?.isOpen) {
        // this.hasConversation = true;
        // this.sendNotification('warning', 'Hey!');
        // await sleep(3000);
        // this.sendNotification('warning', 'Lass das.');
        // await sleep(3000);
        // this.sendNotification('warning', 'Nur gucken okay?');
        // await sleep(5000);
        // this.sendNotification('warning', 'Wir sind doch alle nur scharf auf das Sterni-Merge.');
        // await sleep(60000);
        // this.sendNotification('warning', 'Scheinst ja wirklich interessiert zu sein.');
        // await sleep(60000);
        // this.sendNotification('warning', 'Suchst du was bestimmtest?');
        // await sleep(5000);
        // this.sendNotification('warning', 'Fallste mal ins Repo schauen willst... ');
        // await sleep(3000);
        // this.sendNotification('warning', 'Kannst du mir gerne ne Mail schreiben an sterni.bingo@gmail.com.');
        // await sleep(10000);
        // this.sendNotification('warning', 'Ist jetzt aber nicht spannend.');
        // await sleep(5000);
        // this.sendNotification('warning', 'Ist schon ziemlich ein ziemliches durcheinander hier.');
        // await sleep(5000);
        // this.sendNotification('warning', 'Aber es funktioniert so halbwegs.');
        // await sleep(10000);
        // this.sendNotification('warning', 'Es sei denn du machst was kaputt.');
        // await sleep(5000);
        // this.sendNotification('warning', 'Das wäre nicht so schön.');
        // await sleep(15000);
        // this.sendNotification('warning', 'Also. Dann noch einen schönen Tag.');
        // await sleep(5000);
        // this.sendNotification('warning', 'Kannst dich ja melden, wenn du möchtest. Tschüss!');
        // await sleep(60000);
        // this.sendNotification('warning', 'Immer noch da...');
        // await sleep(60000);
        // this.sendNotification('warning', 'Was ist da los?');
        // await sleep(60000);
        // this.sendNotification('warning', 'Hmm...');
        // await sleep(60000 * 10);
        // this.sendNotification('warning', '10 Minuten später...');
        // await sleep(60000 * 10);
        // this.sendNotification('warning', 'Hallo?');
        // await sleep(60000 * 10);
        // this.sendNotification('warning', 'Der code ist jetzt nicht so ein hingucker.');
        // await sleep(5000);
        // this.sendNotification('warning', 'Wirklich nicht.');
      }
    });
  }

  sendNotification(type, text) {
    this.notyf.open({
      type,
      message: text,
    });
  }

  updateBingo() {
    this.http
      .post(`${environment.backendUrl}/uuid/${this.saufLink}`, {
        saufLink: this.saufLink,
        korken: this.korken,
        fields: this.fields,
        archiveBingoNumbers: this.archiveBingoNumbers,
        archiveFields: this.archiveFields,
        lastUpdate: this.lastUpdate,
        name: this.name,
      })
      .subscribe(
        (val: any) => {
          const { reload, currentTime } = val;
          this.lastUpdate = currentTime;
          if (reload) {
            Swal.fire({
              title: 'Oh Snap!',
              html:
                '<p>Sieht so aus als hätte jemand zwischenzeitlich das Bingo bearbeitet. Kein Problem, wir laden dein Fenster einmal neu dann bist du wieder auf dem aktuellsten Stand.</p><p>In 5 Sekunden...</p>',
              focusConfirm: false,
              confirmButtonText: 'Jetzt neuladen',
            }).then((result) => {
              location.reload();
            });

            setTimeout(() => {
              location.reload();
            }, 6000);
          }

          for (const [i, f] of this.fields.entries()) {
            const has = this.doesFieldHasBingo(i);
            if (has) {
              break;
            }
          }
        },
        (response) => {
          console.log('POST call in error', response);
        },
        () => {}
      );
  }

  getBingo(saufLink) {
    console.log(saufLink);
    localStorage.setItem('saufLink', saufLink);
    this.saufLink = saufLink;

    this.http.get(`${environment.backendUrl}/uuid/${this.saufLink}`).subscribe(
      (val: any) => {
        if (val) {
          this.fields = val.fields;
          this.korken = val.korken;
          this.archiveBingoNumbers = val.archiveBingoNumbers || [];
          this.archiveFields = val.archiveFields || [];
          this.lastUpdate = val.lastUpdate;
          this.name = val.name;

          for (const [i, f] of this.fields.entries()) {
            const has = this.doesFieldHasBingo(i);
            if (has) {
              break;
            }
          }
        }
      },
      (response) => {
        console.log('GET call in error', response);
      },
      () => {}
    );
  }

  addKorken(value: string) {
    this.korken.push(value.length === 1 ? '0' + value : value);
    this.korken = this.korken.sort((a, b) => {
      if (parseInt(a, 10) < parseInt(b, 10)) {
        return -1;
      }
      if (parseInt(a, 10) > parseInt(b, 10)) {
        return 1;
      }
      return 0;
    });
    this.updateBingo();
  }

  removeKorken(value, update = true) {
    const index = this.korken.indexOf(value);
    this.korken.splice(index, 1);
    if (update) {
      this.updateBingo();
    }
  }

  addField(fieldNumber: number = 5) {
    this.fields.push(this.knownFields[`field${fieldNumber}`]);
    this.updateBingo();
  }

  addName(name) {
    this.name = name;
    this.updateBingo();
  }

  saveField(field, index) {
    this.fields[index] = JSON.parse(JSON.stringify(field));
    this.updateBingo();
  }

  deleteField(index) {
    Swal.fire({
      title: 'Bist du dir Sicher!',
      html: '<p>Wenn du das Feld löschst ist es weg!</p>',
      focusConfirm: false,

      cancelButtonText: 'Ne lass mal',
      showCancelButton: true,
      confirmButtonText: 'Weg damit',
    }).then((result) => {
      console.log(result);
      if (result.value) {
        this.fields.splice(index, 1);
        this.updateBingo();
      }
    });
  }

  doesFieldHasBingo(index) {
    const f = this.fields[index];

    // waagerecht bingo
    if (
      this.korken.includes(f[0][0]) &&
      this.korken.includes(f[0][1]) &&
      this.korken.includes(f[0][2]) &&
      this.korken.includes(f[0][3]) &&
      this.korken.includes(f[0][4])
    ) {
      this.bingoNumbers = [f[0][0], f[0][1], f[0][2], f[0][3], f[0][4]];
      this.showBingo(index);
      return true;
    }

    if (
      this.korken.includes(f[1][0]) &&
      this.korken.includes(f[1][1]) &&
      this.korken.includes(f[1][2]) &&
      this.korken.includes(f[1][3]) &&
      this.korken.includes(f[1][4])
    ) {
      this.bingoNumbers = [f[1][0], f[1][1], f[1][2], f[1][3], f[1][4]];
      this.showBingo(index);
      return true;
    }

    if (
      this.korken.includes(f[2][0]) &&
      this.korken.includes(f[2][1]) &&
      this.korken.includes(f[2][2]) &&
      this.korken.includes(f[2][3]) &&
      this.korken.includes(f[2][4])
    ) {
      this.bingoNumbers = [f[2][0], f[2][1], f[2][2], f[2][3], f[2][4]];
      this.showBingo(index);
      return true;
    }

    if (
      this.korken.includes(f[3][0]) &&
      this.korken.includes(f[3][1]) &&
      this.korken.includes(f[3][2]) &&
      this.korken.includes(f[3][3]) &&
      this.korken.includes(f[3][4])
    ) {
      this.bingoNumbers = [f[3][0], f[3][1], f[3][2], f[3][3], f[3][4]];
      this.showBingo(index);
      return true;
    }

    if (
      this.korken.includes(f[4][0]) &&
      this.korken.includes(f[4][1]) &&
      this.korken.includes(f[4][2]) &&
      this.korken.includes(f[4][3]) &&
      this.korken.includes(f[4][4])
    ) {
      this.bingoNumbers = [f[4][0], f[4][1], f[4][2], f[4][3], f[4][4]];
      this.showBingo(index);
      return true;
    }

    // senkrecht bingo
    if (
      this.korken.includes(f[0][0]) &&
      this.korken.includes(f[1][0]) &&
      this.korken.includes(f[2][0]) &&
      this.korken.includes(f[3][0]) &&
      this.korken.includes(f[4][0])
    ) {
      this.bingoNumbers = [f[0][0], f[1][0], f[2][0], f[3][0], f[4][0]];
      this.showBingo(index);
      return true;
    }

    if (
      this.korken.includes(f[0][1]) &&
      this.korken.includes(f[1][1]) &&
      this.korken.includes(f[2][1]) &&
      this.korken.includes(f[3][1]) &&
      this.korken.includes(f[4][1])
    ) {
      this.bingoNumbers = [f[0][1], f[1][1], f[2][1], f[3][1], f[4][1]];
      this.showBingo(index);
      return true;
    }

    if (
      this.korken.includes(f[0][2]) &&
      this.korken.includes(f[1][2]) &&
      this.korken.includes(f[2][2]) &&
      this.korken.includes(f[3][2]) &&
      this.korken.includes(f[4][2])
    ) {
      this.bingoNumbers = [f[0][2], f[1][2], f[2][2], f[3][2], f[4][2]];
      this.showBingo(index);
      return true;
    }

    if (
      this.korken.includes(f[0][3]) &&
      this.korken.includes(f[1][3]) &&
      this.korken.includes(f[2][3]) &&
      this.korken.includes(f[3][3]) &&
      this.korken.includes(f[4][3])
    ) {
      this.bingoNumbers = [f[0][3], f[1][3], f[2][3], f[3][3], f[4][3]];
      this.showBingo(index);
      return true;
    }

    if (
      this.korken.includes(f[0][4]) &&
      this.korken.includes(f[1][4]) &&
      this.korken.includes(f[2][4]) &&
      this.korken.includes(f[3][4]) &&
      this.korken.includes(f[4][4])
    ) {
      this.bingoNumbers = [f[0][4], f[1][4], f[2][4], f[3][4], f[4][4]];
      this.showBingo(index);
      return true;
    }

    // kreuz bingo

    if (
      this.korken.includes(f[0][0]) &&
      this.korken.includes(f[1][1]) &&
      this.korken.includes(f[2][2]) &&
      this.korken.includes(f[3][3]) &&
      this.korken.includes(f[4][4])
    ) {
      this.bingoNumbers = [f[0][0], f[1][1], f[2][2], f[3][3], f[4][4]];
      this.showBingo(index);
      return true;
    }

    if (
      this.korken.includes(f[0][4]) &&
      this.korken.includes(f[1][3]) &&
      this.korken.includes(f[2][2]) &&
      this.korken.includes(f[3][1]) &&
      this.korken.includes(f[4][0])
    ) {
      this.bingoNumbers = [f[0][4], f[1][3], f[2][2], f[3][1], f[4][0]];
      this.showBingo(index);
      return true;
    }

    return false;
  }

  async showBingo(index) {
    if (this.startBingo === false) {
      this.startBingo = true;

      const confettiSettings = { target: 'my-canvas', max: window.innerWidth > 768 ? 800 : 400 };
      const confetti = new ConfettiGenerator(confettiSettings);

      this.sendNotification('success', 'Weisst du was??');
      await sleep(2000);
      this.sendNotification('success', 'Du hast einen Bingo!');

      const audio = new Audio();
      audio.src = '/assets/win.mp3';
      audio.load();
      audio.play();

      await sleep(1000);
      this.sendNotification('success', 'Bingo! Bingo! Bingo!');
      await sleep(1000);

      confetti.render();

      const audio2 = new Audio();
      audio2.src = '/assets/clap.wav';
      audio2.load();
      audio2.play();

      Swal.fire({
        title: `BINGO! ${!this.archiveFields.length ? '' : this.archiveFields.length + 1 + 'x'}`,
        html: `
        <p>
        Du hast es ${!this.archiveFields.length ? 'endlich' : 'wieder'} geschafft und einen Bingo erziehlt!
        Dafür musstest du nur ${this.korken.length} Bier trinken. Hier deine Gewinnzahlen:
        </p>
        <div class="bingo-numbers">
        <div>${this.bingoNumbers[0]}</div>
        <div>${this.bingoNumbers[1]}</div>
        <div>${this.bingoNumbers[2]}</div>
        <div>${this.bingoNumbers[3]}</div>
        <div>${this.bingoNumbers[4]}</div>
        </div>
        <p>
          Sobald du diesen Dialog schließst entfernen wir für dich die Kronkorgen aus deiner Sammlung.
          Das Spielfeld wird unter der neuen Kategorie Bingo's archiviert. Siehst du gleich.
        </p>
        `,
        focusConfirm: false,

        confirmButtonText: 'Alles klar!',
      }).then((result) => {
        console.log(result);
        if (result.value) {
          this.archiveFields.push(this.fields[index]);
          this.archiveBingoNumbers.push(this.bingoNumbers);

          if (this.bingoNumbers) {
            this.bingoNumbers.map((n) => {
              this.removeKorken(n, false);
            });
            this.bingoNumbers = null;
          }

          this.fields.splice(index, 1);
          this.startBingo = false;
          this.updateBingo();
        }

        confetti.clear();
      });
    }
  }
}
