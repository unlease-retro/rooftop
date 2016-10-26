
// Grid('left', 'top') -> (x, y) => ...
// Cell(1 / 12) -> fraction => width: calc(100% * fraction)


// -> child components should not handle layout, only parent Grid
// child components should only use padding
// Grid should use margin for gutters


// TODO

// .Grid           { composes: grid from "./common.css"; }
// .Grid--top      { composes: Grid; align-items: flex-start; }
// .Grid--middle   { composes: Grid; align-items: center; }
// .Grid--bottom   { composes: Grid; align-items: flex-end; }
// .Grid--stretch  { composes: Grid; align-items: stretch; }
// .Grid--baseline { composes: Grid; align-items: baseline; }
// .Grid--left     { composes: Grid; justify-content: flex-start; }
// .Grid--center   { composes: Grid; justify-content: center; }
// .Grid--right    { composes: Grid; justify-content: flex-end; }
// .Grid--between  { composes: Grid; justify-content: space-between; }
// .Grid--around   { composes: Grid; justify-content: space-around; }
//
// .Cell           { composes: cell from "./common.css"; }
// .Cell--fill     { composes: Cell; width: 0; min-width: 0; flex-grow: 1; }
// .Cell--1of12    { composes: Cell; width: calc(100% * 1 / 12); }
// .Cell--2of12    { composes: Cell; width: calc(100% * 2 / 12); }
// .Cell--3of12    { composes: Cell; width: calc(100% * 3 / 12); }
// .Cell--4of12    { composes: Cell; width: calc(100% * 4 / 12); }
// .Cell--5of12    { composes: Cell; width: calc(100% * 5 / 12); }
// .Cell--6of12    { composes: Cell; width: calc(100% * 6 / 12); }
// .Cell--7of12    { composes: Cell; width: calc(100% * 7 / 12); }
// .Cell--8of12    { composes: Cell; width: calc(100% * 8 / 12); }
// .Cell--9of12    { composes: Cell; width: calc(100% * 9 / 12); }
// .Cell--10of12   { composes: Cell; width: calc(100% * 10 / 12); }
// .Cell--11of12   { composes: Cell; width: calc(100% * 11 / 12); }
// .Cell--12of12   { composes: Cell; width: 100%; }
