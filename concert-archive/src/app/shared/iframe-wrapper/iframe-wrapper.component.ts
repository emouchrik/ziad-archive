import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-iframe-wrapper',
  template: `<div #container class="iframe-wrapper" style="width:100%;height:100%;"></div>`,
  standalone: true,
})
export class IframeWrapperComponent implements OnChanges, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;
  @Input() src: string | null = null;

  private iframeEl: HTMLIFrameElement | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if ('src' in changes) {
      this.renderIframe();
    }
  }

  private renderIframe() {
    // remove previous iframe if present
    if (this.iframeEl && this.container && this.iframeEl.parentElement === this.container.nativeElement) {
      try { this.container.nativeElement.removeChild(this.iframeEl); } catch (e) { /* ignore */ }
      this.iframeEl = null;
    }

    if (!this.src) return;

    const iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'autoplay; picture-in-picture; fullscreen; encrypted-media');
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    // assign src last to avoid intermediate loads
    iframe.src = this.src;

    this.container.nativeElement.appendChild(iframe);
    this.iframeEl = iframe;
  }

  ngOnDestroy(): void {
    if (this.iframeEl && this.iframeEl.parentElement === this.container.nativeElement) {
      try { this.container.nativeElement.removeChild(this.iframeEl); } catch (e) { /* ignore */ }
      this.iframeEl = null;
    }
  }
}
