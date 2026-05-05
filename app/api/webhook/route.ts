import { NextRequest, NextResponse } from "next/server";
import { parseTapEvent, assureAdminAuth } from "@atproto/tap";
import { AtUri } from "@atproto/syntax";
import {
  upsertAccount,
  upsertNameRecord,
  upsertPronounRecord,
  deleteNameRecord,
  deletePronounRecord,
  deleteAccount,
} from "@/lib/db/queries";
import * as blue from "@/lib/lexicons/blue";

const TAP_ADMIN_PASSWORD = process.env.TAP_ADMIN_PASSWORD;

export async function POST(request: NextRequest) {
  // Verify request is from our TAP server
  if (TAP_ADMIN_PASSWORD) {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      assureAdminAuth(TAP_ADMIN_PASSWORD, authHeader);
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const body = await request.json();
  const evt = parseTapEvent(body);

  // Handle account/identity changes
  if (evt.type === "identity") {
    if (evt.status === "deleted") {
      await deleteAccount(evt.did);
    } else {
      await upsertAccount({
        did: evt.did,
        handle: evt.handle,
        active: evt.isActive ? 1 : 0,
      });
    }
  }

  // Handle name and pronoun record changes
  if (evt.type === "record") {
    const uri = AtUri.make(evt.did, evt.collection, evt.rkey);

    if (evt.collection === blue.pronouns.name.$type) {
      if (evt.action === "create" || evt.action === "update") {
        let record: blue.pronouns.name.Main;
        try {
          record = blue.pronouns.name.$parse(evt.record);
        } catch {
          return NextResponse.json({ success: false });
        }

        await upsertNameRecord({
          uri: uri.toString(),
          authorDid: evt.did,
          value: record.value,
          preferred: record.preferred ? 1 : 0,
          sortOrder: record.sortOrder ?? 0,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
          indexedAt: new Date().toISOString(),
        });
      } else if (evt.action === "delete") {
        await deleteNameRecord(uri.toString());
      }
    }

    if (evt.collection === blue.pronouns.pronoun.$type) {
      if (evt.action === "create" || evt.action === "update") {
        let record: blue.pronouns.pronoun.Main;
        try {
          record = blue.pronouns.pronoun.$parse(evt.record);
        } catch {
          return NextResponse.json({ success: false });
        }

        await upsertPronounRecord({
          uri: uri.toString(),
          authorDid: evt.did,
          value: record.value,
          preferred: record.preferred ? 1 : 0,
          sortOrder: record.sortOrder ?? 0,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
          indexedAt: new Date().toISOString(),
        });
      } else if (evt.action === "delete") {
        await deletePronounRecord(uri.toString());
      }
    }
  }

  return NextResponse.json({ success: true });
}
