export class Database {
  static async logActivity(
    userId: number,
    action: string,
    entityType: string,
    entityId: number,
    metadata: Record<string, any>,
    ip: string,
    userAgent: string
  ) {
    console.log("Activity logged:", {
      userId,
      action,
      entityType,
      entityId,
      metadata,
      ip,
      userAgent,
    });
  }
}
