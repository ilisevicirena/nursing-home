import { ScheduleMonth } from "shared-components/lib/models/schedule.model";

export function getMonthNames(locale: string): ScheduleMonth[] {
    var baseDate = new Date(Date.UTC(new Date().getFullYear(), 0, 1));
    var months: ScheduleMonth[] = [];

    for (var i = 0; i < 12; i++) {
        months.push({ name: baseDate.toLocaleDateString(locale, { month: 'long' }), key: baseDate.getMonth(), shortName: baseDate.toLocaleDateString(locale, { month: 'short' }) });
        baseDate.setMonth(baseDate.getMonth() + 1);
    }

    return months;
}

export function getYearsInRange(): number[] {
    var arr: number[] = [];
    var startYear = new Date().getFullYear() - 50;
    var endYear = new Date().getFullYear() + 50;
    for (let index = startYear; index <= endYear; index++) {
        arr.push(index);
    }

    return arr;
}

export async function getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.addEventListener("load", function () {
            resolve(reader.result);
        }, false);

        reader.onerror = () => {
            return reject(this);
        };

        reader.readAsDataURL(blob);
    });
}

export function hexToRgbA(hex: string | undefined): string {
    var c: any;
    if (hex) {
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');

            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.08)';
        }

        return ''
    }

    return '';
}

export function sortFloats(direction: any, a: any, b: any): number {
    if (a) {
        a = a.replace(",", "");
        a = parseFloat(a);
    }

    if (b) {
        b = b.replace(",", "");
        b = parseFloat(b);
    }

    if (a < b) return -1 * direction;
    if (a > b) return direction;
    return 0;
}