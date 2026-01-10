import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("fetcing", "5s");
    await step.sleep("trancribiing", "5s");
    await step.sleep("sending-to-ai", "5s");

    await step.run("create-workflow", () => {
      return prisma.workflows.create({
        data: {
          name: "workflow-from-inngest",
        },
      });
    });
  }
);
