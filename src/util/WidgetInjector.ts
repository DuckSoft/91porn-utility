import {Widget} from "../widget/Widget";

export class WidgetInjector {
    private widgets: Widget[];
    private readonly id: string;

    constructor(widgets: Widget[], id: string = "my_widget") {
        this.widgets = widgets;
        this.id = id;
    }

    public detect(): boolean {
        return !!(document.getElementById(this.id));
    }

    public inject(element: Element) {
        if (this.detect()) {
            console.warn("Same injected element exists already. Re-rendering.");
            this.remove()
        }

        let renderedHTML = this.widgets.map(widget => widget.render()).join(" | ");
        element.insertAdjacentHTML("afterbegin", `<div id="${this.id}">${renderedHTML}</div>`);

        this.widgets.forEach(widget => widget.mount());
    }

    private remove() {
        document.getElementById(this.id).remove();
    }
}
