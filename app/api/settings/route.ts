import { NextResponse } from 'next/server';
import { globalStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('settings').select('*').single();
      if (data && !error) {
        return NextResponse.json({
          upiId: data.upi_id || globalStore.upiId,
          qrUrl: data.qr_url || globalStore.qrUrl,
          maintenance: data.maintenance !== undefined ? data.maintenance : globalStore.maintenance,
          whatsappNumber: data.whatsapp_number || globalStore.whatsappNumber,
        });
      }
    } catch (e) {
      // Intentionally fall through to globalStore
    }
  }
  return NextResponse.json(globalStore);
}

export async function POST(req: Request) {
  const data = await req.json();
  
  if (data.upiId !== undefined) globalStore.upiId = data.upiId;
  if (data.qrUrl !== undefined) globalStore.qrUrl = data.qrUrl;
  if (data.maintenance !== undefined) globalStore.maintenance = data.maintenance;
  if (data.whatsappNumber !== undefined) globalStore.whatsappNumber = data.whatsappNumber;
  
  if (supabase) {
    try {
      await supabase.from('settings').upsert({
        id: 1,
        upi_id: globalStore.upiId,
        qr_url: globalStore.qrUrl,
        maintenance: globalStore.maintenance,
        whatsapp_number: globalStore.whatsappNumber,
      });
    } catch (e) {
      // Ignore
    }
  }
  
  return NextResponse.json({ success: true, settings: globalStore });
}
