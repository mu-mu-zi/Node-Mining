

export function getEventParentElement(element: HTMLElement, targetId: string): HTMLElement | null {
  if (!element || element.tagName === "BODY") {
      return null;
  } else if(element.id === targetId) {
      return element
  } else {
      return getEventParentElement(element.parentElement!, targetId);
  }
}