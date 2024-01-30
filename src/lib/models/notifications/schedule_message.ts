class ScheduleMessage {
  messageId: string = "";
  destNumber: string = "";
  body: string = "";
  timeToSend: Date = new Date(0);

  constructor({
    messageId,
    destNumber,
    body,
    timeToSend,
  }: {
    messageId: string;
    destNumber: string;
    body: string;
    timeToSend: Date;
  }) {
    this.messageId = messageId;
    this.destNumber = destNumber;
    this.body = body;
    this.timeToSend = timeToSend;
  }

  // This method sends JSON to the server in Python; keys need to match Python syntax
  toJson(): { [key: string]: string } {
    const data: { [key: string]: string } = {};
    const emojisRegex = /<some emojis regex pattern>/g; // TODO Replace with your actual emojis regex

    data["body"] = this.body.replace(emojisRegex, "");
    data["dest_number"] = this.removePhoneNumberPrefix(this.destNumber);
    data["time_to_send"] = this.formatDate(this.timeToSend);
    return data;
  }

  private removePhoneNumberPrefix(phoneNumber: string): string {
    // Implement the logic to remove phone number prefix if needed
    return phoneNumber;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}

// Example usage
const scheduleMessage = new ScheduleMessage({
  messageId: "yourMessageId",
  destNumber: "yourDestNumber",
  body: "yourMessageBody",
  timeToSend: new Date(),
});
