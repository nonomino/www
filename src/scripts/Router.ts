export class Router {
	private contentTargetId = "content";
	private parser = new DOMParser();

	constructor() {
		document.addEventListener("click", this.handleLinkClick.bind(this));
		window.addEventListener("popstate", this.handlePopState.bind(this));
		history.replaceState(
			{
				path: location.pathname + location.search,
			},
			document.title,
			location.href,
		);
	}

	private async fetchPage(url: string): Promise<string | null> {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				console.error(`Failed to fetch ${url}: ${response.statusText}`);
				location.href = url;
				return null;
			}
			return await response.text();
		} catch (error) {
			console.error(`Network error fetching ${url}:`, error);
			location.href = url;
			return null;
		}
	}

	private extractContent(html: string): {
		content: string;
		title: string;
	} | null {
		const doc = this.parser.parseFromString(html, "text/html");
		const newContent = doc.getElementById(this.contentTargetId);
		const newTitle = doc.querySelector("title")?.textContent ?? "";
		if (!newContent) {
			console.error(`Element #${this.contentTargetId} not found.`);
			return null;
		}
		return {
			content: newContent.innerHTML,
			title: newTitle,
		};
	}

	private updateDom(contentHtml: string, title: string): void {
		const el = document.getElementById(this.contentTargetId);
		if (!el) {
			console.error(
				`Element #${this.contentTargetId} missing in current DOM.`,
			);
			location.reload();
			return;
		}
		el.innerHTML = contentHtml;
		document.title = title;
		scrollTo(0, 0);
	}

	private async handleLinkClick(event: MouseEvent): Promise<void> {
		const anchor = (event.target as HTMLElement).closest("a");
		if (
			!anchor ||
			anchor.target === "_blank" ||
			anchor.hasAttribute("download") ||
			anchor.rel === "external" ||
			!anchor.href ||
			anchor.href.startsWith("mailto:") ||
			anchor.href.startsWith("tel:") ||
			event.ctrlKey ||
			event.metaKey
		)
			return;

		const targetUrl = new URL(anchor.href);
		const currentUrl = new URL(location.href);

		if (targetUrl.origin !== currentUrl.origin) return;

		// Normalize trailing slash
		if (targetUrl.pathname.length > 1 && targetUrl.pathname.endsWith("/")) {
			targetUrl.pathname = targetUrl.pathname.slice(0, -1);
		}

		if (
			targetUrl.pathname === currentUrl.pathname &&
			targetUrl.search === currentUrl.search
		) {
			console.log("Already on this page.");
			return;
		}

		event.preventDefault();

		const html = await this.fetchPage(targetUrl.href);
		if (!html) return;

		const extracted = this.extractContent(html);
		if (!extracted) {
			location.href = anchor.href;
			return;
		}

		this.updateDom(extracted.content, extracted.title);
		history.pushState(
			{
				path: targetUrl.pathname + targetUrl.search,
			},
			extracted.title,
			targetUrl.href,
		);
	}

	private async handlePopState(_: PopStateEvent): Promise<void> {
		const html = await this.fetchPage(location.href);
		if (!html) {
			location.reload();
			return;
		}

		const extracted = this.extractContent(html);
		if (!extracted) {
			location.reload();
			return;
		}

		this.updateDom(extracted.content, extracted.title);
	}
}
