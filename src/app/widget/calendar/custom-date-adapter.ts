import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
    // set the weeks to start with Monday
    override getFirstDayOfWeek(): number {
        return 1; // 1 for Monday
    }
}