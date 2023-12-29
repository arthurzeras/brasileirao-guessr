class _EventBus {
  bus: Record<any, any> = {};

  $off(id: string) {
    delete this.bus[id];
  }

  $on(id: string, callback: () => void) {
    this.bus[id] = callback;
  }

  $emit(id: string, ...params: any[]) {
    if (this.bus[id]) this.bus[id](...params);
  }
}

const EventBus = new _EventBus();
export default EventBus;
