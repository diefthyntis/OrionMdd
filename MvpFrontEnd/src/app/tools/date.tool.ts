import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class DateTool {
    public convertISO8601WithoutTToString(oneDate:String): Date | null {
            const dateTimeParts = oneDate.split(' '); // Sépare la date et l'heure
            const dateParts = dateTimeParts[0].split('-'); // Sépare l'année, le mois et le jour
            const timeParts = dateTimeParts[1].split(':'); // Sépare l'heure, les minutes et les secondes
          
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; // Les mois commencent à 0 en JavaScript
            const day = parseInt(dateParts[2], 10);
          
            const hour = parseInt(timeParts[0], 10);
            const minute = parseInt(timeParts[1], 10);
            const second = parseInt(timeParts[2], 10);
          
            const date = new Date(year, month, day, hour, minute, second);
          
            return isNaN(date.getTime()) ? null : date;
    }

    convertAaaaDashMmDashDdToDate(dateString: string): Date {
        const dateParts = dateString.split('/'); // Sépare l'année, le mois et le jour
      
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Les mois commencent à 0 en JavaScript
        const day = parseInt(dateParts[2], 10);
      
        const yesDate = new Date(year, month, day);
        console.log("date.tools.convertAaaaDashMmDashDdToDate date reçue="+dateString);
        console.log("date.tools.convertAaaaDashMmDashDdToDate date retournée="+yesDate);
        
        //return isNaN(date.getTime()) ? null : date; // Vérifie si la date est valide
        return yesDate;
      }

      public getCurrentDate(): String {
        let now = new Date();
        return now.toString();
      }

      public convertYyyyMmDdToDdMmYyyy(dateString:String) {
        const [year, month, day] = dateString.split('/');
      return `${day}/${month}/${year}`;
      }
}