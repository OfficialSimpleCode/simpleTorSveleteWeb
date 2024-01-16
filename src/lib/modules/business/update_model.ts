class Update {
    title: string = '';
    content: string = '';
    lastModified: string = '';
    index: string = '';
    id: string = '';
    popOnEnter: boolean = false;
  
    constructor(
      title: string,
      content: string,
      id: string,
      lastModified: string,
      index: string,
      popOnEnter: boolean = false
    ) {
      this.title = title;
      this.content = content;
      this.id = id;
      this.lastModified = lastModified;
      this.index = index;
      this.popOnEnter = popOnEnter;
    }
  
    static fromJson(json: any, newIndex: string): Update {
      return new Update(
        json['title'] ?? '',
        json['content'] ?? '',
        json['id'] ?? '',
        json['lastModified'] ?? '',
        newIndex,
        json['popOnEnter'] ?? false
      );
    }
  
    static fromUpdate(other: Update): Update {
      return new Update(
        other.title,
        other.content,
        other.id,
        other.lastModified,
        other.index,
        other.popOnEnter
      );
    }
  
    toJson(): Record<string, any>  {
      const data: any = {};
      data['title'] = this.title;
      data['id'] = this.id;
      data['content'] = this.content;
      if (this.lastModified !== '') {
        data['lastModified'] = this.lastModified;
      }
      if (this.popOnEnter) {
        data['popOnEnter'] = this.popOnEnter;
      }
      return data;
    }
  
    isValid(): boolean {
      return this.title !== '' && this.content !== '';
    }
  
    toString(): string {
      return JSON.stringify(this, null, 2);
    }
  }
  